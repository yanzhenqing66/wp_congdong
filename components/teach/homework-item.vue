<template>
  <view class="homework_item">
    <com-stu-no>NO.000000</com-stu-no>
    <view class="homework_item_content">
      <view class="content">
        <text class="content_title">作业目标: </text>
        <text class="content_name">重心降低，核心稳定，是标准动作的前提。</text>
      </view>
      <view class="date uni-mt-10">布置时间：2022/9/30</view>
    </view>
    <view class="border-line uni-my-10"></view>
    <view class="homework_item_content">
      <view class="content">
        <text class="content_title">作业内容: </text>
        <text class="content_name">重心降低，核心稳定，是标准动作的前提。重心降低，核心稳定，是标准动作的前提。重心降低，核心稳定，是标准动作的前提。</text>
      </view>
    </view>
    <view class="homework_item_handle" v-if="handleBtn">
      <button class="homework_item_handle_noSubmit" size="mini">未提交作业数/2</button>
      <button class="homework_item_handle_noComment" size="mini">未点评作业数/2</button>
      <button class="homework_item_handle_detail" size="mini" @click="handleGoDetail">作业详情</button>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps({
    handleBtn: {
      type: Boolean,
      default: false
    }
  })
  const handleGoDetail = () => {
    uni.navigateTo({
      url: '/pages/teach/hw-detail/index'
    })
  }
</script>

<style lang="scss" scoped>
  .homework_item {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 50rpx 40rpx 34rpx 40rpx;
  }

  .homework_item_content {
    .content {
      display: flex;
      align-items: baseline;

      &_title {
        font-size: $uni-font-size-lg;
        margin-right: 20rpx;
      }

      &_name {
        flex: 1;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }

    .date {
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
  }

  .homework_item_handle {
    margin-top: 35rpx;
    height: 59rpx;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    &_noSubmit,
    &_noComment {
      width: 192rpx;
      height: 42rpx;
      @extend %flexCenter;
      font-size: 18rpx;
      background-color: $uni-color-primary;
      color: #fff;
      border-radius: 100px;
    }

    &_detail {
      width: 195rpx;
      height: 59rpx;
      @extend %flexCenter;
      font-size: 23rpx;
      background-color: $uni-color-warning;
      color: #fff;
      border-radius: 100px;
    }
  }
</style>
