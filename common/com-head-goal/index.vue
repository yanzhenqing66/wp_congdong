<template>
  <view class='stu_no'>
    <text>作业目标: <text class="blod">{{goal}}</text></text>
  </view>
</template>

<script setup>
  const props = defineProps({
    goal: {
      type: String,
      default: '体前变向运球练习'
    }
  })
</script>

<style scoped lang="scss">
  .stu_no {
    position: absolute;
    top: -10rpx;
    left: -10rpx;
    right: -10rpx;

    height: 61rpx;
    // transform: translateY(-30rpx);
    background: url('~@/static/images/teach/goal-bg.png') no-repeat;
    background-size: cover;
    font-size: $uni-font-size-sm;
    color: #fff;
    padding: 10rpx 12rpx 0;
    display: flex;
  }
</style>
