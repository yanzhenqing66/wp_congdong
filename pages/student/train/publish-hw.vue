<template>
  <com-stu-layout>
    <view class="pub-hw-box">
      <com-cur-date color='#fff'></com-cur-date>
      <view class="pub-hw uni-px-8">
        <com-head-goal></com-head-goal>
        <view class="pub-hw_publish">
          <video class="video" src="" controls></video>
          <view class="pub-time uni-mt-8">作业发布时间：2022/09/30 22:00</view>
        </view>
        <view class="border-line uni-my-8"></view>
        <view class="pub-hw_stu-up">
          <text class="bold">我上传的视频</text>
          <video class="video" :src="videoSrc" controls v-show='videoSrc'></video>
          <view v-show='!videoSrc' class="upload flex-center uni-primary-bg uni-radius-lg" @click="handleSelect">
            <view>
              <uni-icons type="videocam" size="50" color="#fff"></uni-icons>
              <view class="upload_text">上传或拍摄训练视频</view>
            </view>
          </view>
        </view>
        <view class="pub-hw_submit uni-mt-8">
          <com-button type='primary' className='uni-radius-pill' size='mini' width='252rpx' height='52rpx'>确认提交
          </com-button>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>
<script setup>
  import {
    ref,
    watch
  } from 'vue'
  import {
    uploadVideo
  } from '@/api/path/student.js'

  const videoSrc = ref('')

  const handleSelect = () => {
    uni.chooseVideo({
      sourceType: ['camera', 'album'],
      compressed: true,
      success: function(res) {
        uploadFile(res.tempFilePath)
      }
    })
  }

  const uploadFile = (tempFilePath) => {
    console.log(tempFilePath);
    uni.showLoading({
      title: '上传进度：0%',
      mask: true //是否显示透明蒙层，防止触摸穿透
    })
    const uploadTask = uni.uploadFile({
      url: 'http://82.157.232.47:8080/cos/upload', //开发者服务器地址
      filePath: tempFilePath, //要上传文件资源的路径（本地路径）
      name: 'file', //文件对应key,开发者在服务端可以通过这个 key 获取文件的二进制内容
      header: {
        "Content-Type": "multipart/form-data",
      },
      success: function(res) {
        const data = JSON.parse(res.data).data
        videoSrc.value = data.url
        uni.hideLoading()
        uni.showToast({
          title: '上传成功',
          icon: 'success'
        })
      },
      fail: function() {
        // fail
        uni.hideLoading()
        uni.showToast({
          title: '上传失败',
          icon: 'none'
        })
      },
    })

    //监听上传进度变化事件
    uploadTask.onProgressUpdate((res) => {
      uni.showLoading({
        title: '上传进度：' + res.progress + '%',
        mask: true //是否显示透明蒙层，防止触摸穿透
      })
      console.log("上传进度", res.progress)
      console.log("已经上传的数据长度，单位 Bytes:", res.totalBytesSent)
      console.log("预期需要上传的数据总长度，单位 Bytes:", res.totalBytesExpectedToSend)
    })
  }
</script>

<style lang="scss" scoped>
  .pub-hw-box {
    width: 675rpx;
    margin: 0 auto;
  }

  .pub-hw {
    position: relative;
    width: 100%;
    margin-top: 40rpx;
    background-color: #fff;
    padding-top: 60rpx;
    padding-bottom: 20rpx;

    &_publish {
      .video {
        width: 100%;
        height: 300rpx;
        background-color: $uni-bg-color-grey;
      }

      .pub-time {
        text-align: right;
        color: $uni-text-color-grey;
        font-size: $uni-font-size-sm;
      }
    }

    &_stu-up {
      .video {
        width: 100%;
        height: 300rpx;
        background-color: $uni-bg-color-grey;
      }

      .upload {
        width: 100%;
        height: 300rpx;
        text-align: center;

        &_text {
          font-size: $uni-font-size-sm;
        }
      }
    }

    &_submit {
      width: 100%;
      text-align: right;
    }
  }
</style>
