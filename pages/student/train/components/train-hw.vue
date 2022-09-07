<template>
  <view class="tHw">
    <com-head-goal></com-head-goal>
    <view class="tHw_content uni-px-15 uni-pb-15">
      <view class="content">
        <text class="content_title">动作内容: </text>
        <text class="content_name">重心降低，核心稳定，是标准动作的前提。</text>
      </view>
      <view class="border-line uni-my-10"></view>
      <view class="content">
        <text class="content_title">动作要点: </text>
        <text class="content_name">重心降低，核心稳定，是标准动作的前提。重心降低，核心稳定，是标准动作的前提。重心降低，核心稳定，是标准动作的前提。</text>
      </view>
      <view class="border-line uni-my-10"></view>
      <view class="tHw_info flex flex-bewteen">
        <text class="bold">完成组数：<text class="tHw_info_num uni-primary">4</text></text>
        <text class="tHw_info_publish-date">布置时间：2022/9/30</text>
      </view>
      <view class="border-line uni-my-10"></view>
      <view class="flex-center">
        <com-button type='primary' size='mini' width='362rpx' height='51rpx' className='uni-radius-pill'
          @click='handlePublishHw'>提交视频作业
        </com-button>
      </view>
    </view>
  </view>
</template>

<script setup>
  const handlePublishHw = () => {
    uni.navigateTo({
      url: '/pages/student/train/publish-hw'
    })
  }
</script>

<style scoped lang="scss">
  .tHw {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 50rpx;
    color: $uni-text-color;

    &_content {
      padding-top: 60rpx;
    }

    .content {
      display: flex;
      align-items: baseline;

      &_title {
        font-size: $uni-font-size-lg;
        color: $uni-primary;
        margin-right: 20rpx;
      }

      &_name {
        flex: 1;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }

    &_info {
      // display: flex;
      align-items: flex-end;

      &_num {
        font-size: $uni-font-size-lg;
      }

      &_publish-date {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }
  }
</style>
