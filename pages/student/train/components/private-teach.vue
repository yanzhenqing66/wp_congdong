<template>
  <view class="priTeach uni-px-15 uni-pb-15">
    <com-head-goal></com-head-goal>
    <TeachHead />
    <view class="border-line uni-my-10"></view>
    <view class="flex-bewteen flex-align-center">
      <view class="price bold">签约价格：<text class="uni-primary">1298</text><text class="unit">元</text></view>
      <com-button type='primary' width='184rpx' height='51rpx' className='uni-radius-pill' @click='goPage'>签约教练
      </com-button>
    </view>
  </view>
</template>

<script setup>
  import TeachHead from './teach-head.vue'

  const goPage = () => {
    uni.navigateTo({
      url: '/pages/student/train/sign-teach'
    })
  }
</script>

<style lang="scss" scoped>
  .priTeach {
    position: relative;
    width: 100%;
    color: $uni-text-color;
    background: #fff;
    padding-top: 60rpx;
    color: #333;
    margin-top: 50rpx;
  }

  .price {
    font-size: $uni-font-size-lg;

    .unit {
      margin-left: 1em;
      font-size: $uni-font-size-sm;
    }
  }
</style>
