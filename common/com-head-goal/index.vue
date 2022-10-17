<template>
  <view class='stu_no'>
    <text>
      <slot />
    </text>
  </view>
</template>

<script setup>
</script>

<style scoped lang="scss">
  .stu_no {
    position: absolute;
    top: -10rpx;
    left: -10rpx;
    right: -10rpx;

    height: 61rpx;
    // transform: translateY(-30rpx);
    background: url('~@/static/images/teach/goal-bg.png') no-repeat;
    background-size: cover;
    font-size: $uni-font-size-sm;
    color: #fff;
    padding: 10rpx 12rpx 0;
    display: flex;
  }
</style>
