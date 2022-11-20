<template>
  <com-stu-layout headShow>
    <view class="sub-questions flex-center">
      <view class="flex-col">
        <view class="title">感谢您的耐心解答，即将进入丛动家族 系统正在为您量身订制训练课程及推荐教练</view>
        <view class="loading">
          <zero-loading type="gear" position="absolute"></zero-loading>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/student/home/index'
    })
  }, 2000)
</script>

<style lang="scss" scoped>
  .sub-questions {
    height: 100%;

    .loading {
      margin-top: 180rpx;
      position: relative;
    }

    .title {
      width: 515rpx;
    }
  }
</style>
