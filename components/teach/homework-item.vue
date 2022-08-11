<template>
  <view class="homework_item">
    <com-stu-no>NO.000000</com-stu-no>
    <view class="homework_item_content">
      <view class="content">
        <text class="content_title">作业目标: </text>
        <text class="content_name">重心降低，核心稳定，是标准动作的前提。</text>
      </view>
      <view class="date uni-mt-10">布置时间：2022/9/30</view>
    </view>
    <view class="border-line uni-my-10"></view>
    <view class="homework_item_content">
      <view class="content">
        <text class="content_title">作业内容: </text>
        <text class="content_name">重心降低，核心稳定，是标准动作的前提。重心降低，核心稳定，是标准动作的前提。重心降低，核心稳定，是标准动作的前提。</text>
      </view>
    </view>
    <view class="homework_item_handle" v-if="handleBtn">
      <view class='handle_btn flex-center uni-primary-bg uni-radius-pill'>
        未提交作业数/2
      </view>
      <view class='handle_btn flex-center uni-primary-bg uni-radius-pill'>
        未点评作业数/2
      </view>
      <com-button type='warning' size='mini' width='195rpx' height='59rpx' className='uni-radius-pill'
        @click="handleGoDetail">作业详情</com-button>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps({
    handleBtn: {
      type: Boolean,
      default: false
    }
  })
  const handleGoDetail = () => {
    uni.navigateTo({
      url: '/pages/teach/hw-detail/index'
    })
  }
</script>

<style lang="scss" scoped>
  .homework_item {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 50rpx 40rpx 34rpx 40rpx;
  }

  .homework_item_content {
    .content {
      display: flex;
      align-items: baseline;

      &_title {
        font-size: $uni-font-size-lg;
        margin-right: 20rpx;
      }

      &_name {
        flex: 1;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }

    .date {
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
  }

  .homework_item_handle {
    margin-top: 35rpx;
    height: 59rpx;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .handle_btn {
      width: 192rpx;
      height: 42rpx;
      font-size: $uni-font-size-sm;
      color: #fff;
    }

    &_detail {
      width: 195rpx;
      height: 59rpx;
      @extend %flexCenter;
      font-size: 23rpx;
      background-color: $uni-color-warning;
      color: #fff;
      border-radius: 100px;
    }
  }
</style>
