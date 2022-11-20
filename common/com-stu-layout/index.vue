<template>
  <view class="stu_layout">
    <view class="nav_bar_top" :style="{height: topHeight + 'rpx'}" v-if="headShow">
      <slot name="head"></slot>
    </view>
    <scroll-view class="stu_layout_children" scroll-y="true" scroll-x="false"
      :style="{position: headShow ? 'absolute' : '', top: topHeight + 'rpx'}">
      <slot />
    </scroll-view>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  const topHeight = ref(0)

  const props = defineProps({
    headShow: {
      type: Boolean,
      default: false
    },
    tabShow: {
      type: Boolean,
      default: false
    }
  })

  onMounted(() => {
    topHeight.value = uni.getSystemInfoSync().statusBarHeight * 2 + 80
  })
</script>

<style scoped lang="scss">
  .stu_layout {
    width: 100%;
    min-height: 100%;
    background: url('https://congdong-1312872844.cos.ap-beijing.myqcloud.com/logobg.png') no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    background-position: center;
    color: $uni-text-color-inverse;
    
    .nav_bar_top {
      /* height: 80rpx; */
      width: 100%;
      display: flex;
      align-items: flex-end;
    }

    &_children {
      // bottom: calc(100rpx + 24rpx + env(safe-area-inset-bottom));/
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
