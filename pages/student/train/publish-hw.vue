<template>
  <com-stu-layout>
    <view class="pub-hw-box">
      <com-cur-date color='#fff'></com-cur-date>
      <view class="pub-hw uni-px-8">
        <com-head-goal></com-head-goal>
        <view class="pub-hw_publish">
          <view class="video"></view>
          <view class="pub-time uni-mt-8">作业发布时间：2022/09/30 22:00</view>
        </view>
        <view class="border-line uni-my-8"></view>
        <view class="pub-hw_stu-up">
          <text class="bold">我上传的视频</text>
          <view class="video"></view>
          <view class="upload flex-center uni-primary-bg uni-radius-lg">
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
