<template>
  <view class="flex">
    <com-image :src='data.avatar' width='150rpx' height='150rpx' className='uni-radius-pill'></com-image>
    <view class="info uni-ml-8">
      <view class="info_name">{{data.userName}}</view>
      <view class="info_introduct uni-my-5">{{data.introduce}}</view>
      <view class="uni-primary">技术特长：{{data.specialty}}</view>
    </view>
  </view>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      default: {}
    },
  })
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
