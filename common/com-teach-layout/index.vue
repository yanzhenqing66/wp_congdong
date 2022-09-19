<template>
  <view class="teach-layout">
    <slot />
    <view class="footer">
      <com-tab-bar></com-tab-bar>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
  .teach-layout {
    height: 100%;
  }

  .footer {
    height: calc(100rpx + 24rpx + env(safe-area-inset-bottom));
  }
</style>
