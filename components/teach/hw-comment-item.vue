<template>
  <view class="hwCItem">
    <view class="hwCItem_no">
      <text class="blod">NO.000000</text>
      <text class="uni-mx-10">|</text>
      <text>作业目标: <text class="blod">体前变向运球练习</text></text>
    </view>
    <view class="hwCItem_video"></view>
    <view class="hwCItem_upload-time uni-mt-5">上传时间：2022/09/30 22:00</view>
    <view class="hwCItem_teach-comment uni-primary">教练点评</view>
    <view class="border-line uni-my-10"></view>
    <view class="hwCItem_handle">
      <view class="inline">
        <uni-number-box />
        <text class="hwCItem_handle_mark">分</text>
      </view>
      <com-button size='mini' type='warning' className='uni-radius-pill'>评分</com-button>
      <com-button size='mini' type='primary' className='uni-radius-pill' @click='handleComment'>在线点评</com-button>
    </view>
    <view class="hwCItem_comment" v-show="commentFlag"></view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  const commentFlag = ref(false)

  const handleComment = () => {
    commentFlag.value = !commentFlag.value
  }
</script>

<style scoped lang="scss">
  .hwCItem {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20rpx 15rpx 30rpx;

    &_no {
      position: absolute;
      top: -29rpx;
      left: -11rpx;

      width: 100%;
      height: 61rpx;
      background: url('~@/static/images/teach/goal-bg.png') no-repeat;
      background-size: cover;
      font-size: $uni-font-size-sm;
      color: #fff;
      padding: 10rpx 12rpx 0;
      display: flex;
    }

    &_video {
      margin-top: 20rpx;
      width: 100%;
      height: 300rpx;
      background-color: #ccc;
    }

    &_upload-time {
      text-align: right;
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
    }

    &_handle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_mark {
        padding: 5rpx;
        background-color: $uni-color-primary;
        color: #fff;
      }
    }

    &_comment {
      width: 100%;
      height: 350rpx;
      background-color: $uni-bg-color-grey;
      margin-top: 20rpx;
    }
  }
</style>
