<template>
  <view class="stu_no">
    <slot></slot>
  </view>
</template>

<script setup>
</script>

<style lang="scss">
  .stu_no {
    position: absolute;
    top: -29rpx;
    left: -11rpx;

    width: 183rpx;
    height: 61rpx;
    background: url('~@/static/images/teach/stu_no_bg.png') no-repeat;
    background-size: cover;
    font-size: $uni-font-size-sm;
    color: #fff;
    padding: 10rpx 12rpx 0;
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
  }
</style>
