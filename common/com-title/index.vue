<template>
  <view :class="['title', 'uni-primary-bg', className]" :style="{background: bgColor}">
    <slot />
  </view>
</template>

<script setup>
  defineProps({
    bgColor: {
      type: String,
      default: ''
    },
    className: {
      type: String
    }
  })
</script>

<style scoped lang="scss">
  .title {
    width: 100%;
    height: 75rpx;
    opacity: 0.9;
    color: #fff;
    font-size: $uni-font-size-lg;
    line-height: 75rpx;
    text-align: center;
    margin-bottom: 50rpx;
  }
</style>
