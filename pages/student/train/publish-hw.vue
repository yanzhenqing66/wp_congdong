<template>
  <com-stu-layout>
    <view class="pub-hw-box" v-if="data.id">
      <view class="flex-bewteen">
        <com-cur-date color='#fff'></com-cur-date>
        <button v-if="data.recordVideoUrl" class="uni-radius-pill uni-primary-bg" style="color: #fff;" open-type="share" size="mini">
          转发分享
        </button>
      </view>
      <view class="pub-hw uni-px-8">
        <com-head-goal>作业目标: {{data.homeworkTitle}}</com-head-goal>
        <view class="pub-hw_publish">
          <video class="video" :src="data.studyVideoUrl" controls></video>
          <view class="flex-bewteen flex-align-center">
            <text class="uni-primary">教练示范视频</text>
            <text class="pub-time uni-mt-8">
              作业发布时间：{{formatTime(data.createTime)}}
            </text>
          </view>
        </view>
        <view class="border-line uni-my-8"></view>
        <view class="pub-hw_stu-up">
          <view class="bold uni-mb-8">我上传的视频</view>
          <video class="video" :src="videoSrc" controls v-if='videoSrc'></video>
          <view v-else class="upload flex-center uni-primary-bg uni-radius-lg" @click="handleSelect">
            <view>
              <uni-icons type="videocam" size="50" color="#fff"></uni-icons>
              <view style="color: #fff">上传或拍摄训练视频</view>
            </view>
          </view>
        </view>
        <view class="pub-hw_submit uni-mt-8" v-if="status">
          <com-button type='primary' className='uni-radius-pill' size='mini' width='252rpx' height='52rpx'
            @click='handleSubmit'>确认提交
          </com-button>
        </view>
        <view class="sub-info" v-if="!status">
          <text class="score">获得学分: <text class="uni-primary">{{data.score}}</text></text>
          <text class="date">提交时间：{{formatTime(data.submitTime)}}</text>
        </view>
        <view class="comment uni-mt-12" v-if="data.comments[0]">
          <view class="uni-mb-10">老师评论: </view>
          <text class="content">{{data.comments[0]}}</text>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>
<script setup>
  import {
    onLoad,
    onShareAppMessage
  } from '@dcloudio/uni-app'
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    uploadVideo,
    fetchHwDetail,
    submitHw,
    fetchShareSuccess
  } from '@/api/path/student.js'
  import {
    formatDate
  } from '@/libs/day.js'

  const id = ref('')
  const videoSrc = ref('')
  const videoId = ref('')
  const data = ref({})
  const status = ref(true)

  onLoad(options => {
    id.value = options.id
  })

  onMounted(() => {
    fetchHwDetail(id.value).then(res => {
      data.value = res
      if (res.recordVideoUrl) {
        videoSrc.value = res.recordVideoUrl
        status.value = false
      }
    })
  })

  const formatTime = (date) => {
    if (!date) return ''
    return formatDate(date).year + '/' + formatDate(date).formatMM + '/' + formatDate(date).formatDD + ' ' +
      formatDate(date).hour + ':' + formatDate(date).minute
  }

  onShareAppMessage(res => {
    const user = uni.getStorageSync('user')
    fetchShareSuccess({
      userId: user.id,
      shareId: data.value.id
    }).then(() => {})
    return {
      title: data.value.homeworkTitle,
      path: `/pages/share/stu-video?id=${data.value.id}`,
      imageUrl: 'https://congdong-1312872844.cos.ap-beijing.myqcloud.com/20221105200549.png'
    }
  })

  const handleSubmit = () => {
    if (!videoId.value) {
      uni.showToast({
        icon: 'none',
        title: '请先上传视频'
      })
      return
    }
    uni.showModal({
    	title: '确认提交吗？',
    	success: function (res) {
    		if (res.confirm) {
    			const params = {
    			  studentId: data.value.studentId,
    			  teacherId: data.value.teacherId,
    			  homeworkStudentDetailId: data.value.id,
    			  videoId: videoId.value
    			}
    			submitHw(params).then(res => {
    			  status.value = false
    			  uni.showToast({
    			    icon: 'success',
    			    title: '作业提交成功'
    			  })
    			}).catch(err => {
    			  uni.showToast({
    			    icon: 'error',
    			    title: '作业提交失败, 请重试'
    			  })
    			})
    		} else if (res.cancel) {
    			console.log('用户点击取消');
    		}
    	}
    })
  }

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
    uni.showLoading({
      title: '上传进度：0%',
      mask: true //是否显示透明蒙层，防止触摸穿透
    })
    const uploadTask = uni.uploadFile({
      url: 'https://www.huihuishou.vip/congdong/cos/upload', //开发者服务器地址
      filePath: tempFilePath, //要上传文件资源的路径（本地路径）
      name: 'file', //文件对应key,开发者在服务端可以通过这个 key 获取文件的二进制内容
      header: {
        "Content-Type": "multipart/form-data",
      },
      success: function(res) {
        const data = JSON.parse(res.data).data
        videoSrc.value = data.url
        videoId.value = data.id
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
    })
  }
</script>

<style lang="scss" scoped>
  .pub-hw-box {
    width: 675rpx;
    margin: 0 auto;
    padding-top: 30rpx;
    color: #333;
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
      }
    }

    &_submit {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    .sub-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $uni-font-size-sm;

      .score {
        font-size: $uni-font-size-base;
      }

      .date {
        color: $uni-text-color-grey;
      }
    }

    .comment {
      background-color: #f6f6f6;
      padding: 20rpx;
      border-radius: 4px;

      .content {
        background-color: $uni-primary;
        padding: 3rpx 5rpx;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
</style>
