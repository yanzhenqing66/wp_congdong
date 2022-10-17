<template>
  <view class="homework_item">
    <com-stu-no><text>NO.{{data.id}}</text></com-stu-no>
    <view class="homework_item_content">
      <view class="content">
        <text class="content_title">作业目标: </text>
        <text class="content_name">{{data.title}}</text>
      </view>
      <view class="date uni-mt-10">布置时间：{{formatDate(data.createTime).fullDate}}</view>
    </view>
    <view class="border-line uni-my-10"></view>
    <view class="homework_item_content">
      <view class="content">
        <text class="content_title">作业内容: </text>
        <text class="content_name">{{data.content}}</text>
      </view>
    </view>
    <view class="homework_item_handle" v-if="handleBtn">
      <view class='handle_btn'>
        {{data.unSubmitNum}}人未提交 | {{data.unCommentNum}}人未点评
      </view>
      <com-button type='warning' size='mini' width='195rpx' height='59rpx' className='uni-radius-pill'
        @click="handleGoDetail(data.id)">作业详情</com-button>
    </view>
  </view>
</template>

<script setup>
  import {
    formatDate
  } from '@/libs/day.js'
  defineProps({
    data: {
      type: Object,
      default: {}
    },
    handleBtn: {
      type: Boolean,
      default: false
    }
  })

  const handleGoDetail = (id) => {
    uni.navigateTo({
      url: `/pages/teach/hw-detail/index?homeworkId=${id}`
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

    .handle_btn {
      padding: 10rpx 19rpx;
      border-radius: 4px;
      background-color: $uni-bg-color-grey;
      font-size: $uni-font-size-sm;
      color: $uni-color-error;
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
