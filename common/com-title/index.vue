<template>
  <view class="title">
    <slot />
  </view>
</template>

<script>
</script>

<style scoped lang="scss">
  .title {
    width: 100%;
    height: 75rpx;
    background-color: $uni-color-primary;
    opacity: 0.9;
    color: #fff;
    font-size: $uni-font-size-lg;
    line-height: 75rpx;
    text-align: center;
    margin-bottom: 50rpx;
  }
</style>
