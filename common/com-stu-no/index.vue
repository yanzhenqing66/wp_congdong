<template>
  <view class="stu_no">
    <image src="/static/images/no_num.png" class="stu_no_icon"></image>
    <view class="uni-ml-2 uni-mt-n2">
      <slot />
    </view>
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
    padding: 12rpx 12rpx 0;
    display: flex;

    &_icon {
      width: 29rpx;
      height: 25rpx;
    }
  }
</style>
