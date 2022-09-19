<template>
  <com-stu-layout headShow>
    <view class="sub-questions flex-center">
      <view class="flex-col box">
        <view class="title">感谢您的耐心解答，即将进入丛动家族 系统正在为您量身订制训练课程及推荐教练</view>
        <zero-loading type="pulse" position="absolute" class='loading'></zero-loading>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .sub-questions {
    height: 100%;

    .box {
      position: relative;
    }

    .loading {
      ::v-deep.container {
        top: 0;
      }
    }

    .title {
      width: 497rpx;
    }
  }
</style>
