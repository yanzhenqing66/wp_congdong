<template>
  <view class="teach-layout">
    <slot />
    <view class="footer">
      <tab-bar :curPath='curPath'></tab-bar>
    </view>
  </view>
</template>

<script setup>
  import TabBar from './tab-bar.vue'
  defineProps({
    curPath: {
      type: String,
      default: '/pages/teach/student/index'
    }
  })
</script>

<style scoped>
  .teach-layout {
    height: 100%;
  }

  .footer {
    height: calc(100rpx + 24rpx + env(safe-area-inset-bottom));
  }
</style>
