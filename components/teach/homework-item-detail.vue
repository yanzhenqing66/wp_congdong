<template>
  <view class="hwIDetail">
    <!-- <com-stu-head></com-stu-head> -->
    <StuInfo :data='data' />
    <view class="border-line uni-my-10"></view>
    <view class="hwIDetail_status">
      <view>
        <view>作业状态：{{hwStatus(data.submitStatus)}}</view>
        <view>点评状态：{{commentStatus(data.commentStatus)}}</view>
      </view>
      <view>学分：</view>
      <!-- <com-button v-if="current === 0" size='mini' type='warning' className='uni-radius-pill'>提醒</com-button> -->
      <com-button v-if="current === 1" size='mini' type='warning' className='uni-radius-pill' @click='handleGoComment'>
        点评作业
      </com-button>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'

  import StuInfo from '@/components/teach/stu-info'
  import {
    hwStatus,
    commentStatus
  } from '@/libs/hw-status.js'

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    },
    current: {
      type: Number,
      default: 0
    }
  })

  const handleGoComment = () => {
    uni.navigateTo({
      url: '/pages/teach/comment-hw/index'
    })
  }
</script>

<style lang="scss" scoped>
  .hwIDetail {
    width: 100%;
    padding: 20rpx 35rpx;
    background-color: #fff;

    &_status {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
    }
  }
</style>
