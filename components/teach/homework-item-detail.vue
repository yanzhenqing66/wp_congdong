<template>
  <view class="hwIDetail">
    <com-stu-head></com-stu-head>
    <view class="border-line uni-my-10"></view>
    <view class="hwIDetail_status">
      <view>
        <view>作业状态：未提交</view>
        <view>点评状态：未点评</view>
      </view>
      <view>学分：32</view>
      <template>
        <com-button v-if="current === 0" size='mini' type='warning' className='uni-radius-pill'>提醒</com-button>
        <com-button v-else size='mini' type='warning' className='uni-radius-pill' @click='handleGoComment'>点评作业
        </com-button>
      </template>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps({
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
