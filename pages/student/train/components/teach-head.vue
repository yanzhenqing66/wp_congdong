<template>
  <view class="flex">
    <com-image src='' width='150rpx' height='150rpx' className='uni-radius-pill'></com-image>
    <view class="info uni-ml-8">
      <view class="info_name">杨文玉</view>
      <view class="info_introduct uni-my-5">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</view>
      <view class="uni-primary">技术特长：特长特长特长特长特长特长特长特长</view>
    </view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .info {
    flex: 1;
    font-size: $uni-font-size-sm;

    &_name {
      font-size: $uni-font-size-base;
    }

    &_introduct {
      color: $uni-text-color-grey;
    }
  }
</style>
