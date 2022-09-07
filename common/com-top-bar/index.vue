<template>
  <view>
    <view :style="{height: statusBarHeight + 'rpx'}">
      <!-- 这里是状态栏 -->
    </view>
    <view class="nav_bar_top">
      <slot />
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'

  const statusBarHeight = ref(0)

  onMounted(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
  })
</script>

<style>
  /*  .status_bar_top {
    height: 80rpx;
    width: 100%;
  } */

  .nav_bar_top {
    height: 80rpx;
    width: 100%;
  }
</style>
