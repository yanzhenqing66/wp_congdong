<template>
  <com-stu-layout headShow>
    <view class="home">
      <image src='/static/images/logo.png' class="logo"></image>
    </view>
  </com-stu-layout>
</template>

<script setup>
</script>

<style scoped lang="scss">
  .home {
    position: relative;
    width: 100%;
    height: 100%;

    .logo {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 284rpx;
      height: 289rpx;
    }
  }
</style>
