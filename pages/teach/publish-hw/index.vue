<template>
  <view class="container">
    <view class="publish">
      <UserHead />
      <view class="publish_edit">编辑作业信息</view>
      <view class="publish_calendar">
        <uni-calendar v-model="form.hwDate" :start-date="startDate" :insert="true" range :showMonth="false"
          @change="handleDateChange" />
      </view>
      <view class="publish_select">
        <uni-data-select v-model="form.train" :localdata="trainGoalList" @change="handleTrainChange" placeholder="作业目标">
        </uni-data-select>
        <view class="seat"></view>
        <uni-easyinput trim="all" v-model="actionPoint" placeholder="填写动作要点" @input="handlePoint"></uni-easyinput>
        <view class="seat"></view>
        <view class="publish_select_content">
          <view class="title uni-primary-bg flex-center max-1-line">
            <uni-icons type="closeempty" color="#fff" size="22rpx" class='uni-mt-1 uni-mr-1'></uni-icons>
            <text>体前变向运球</text>
          </view>
          <view class="video uni-warning-bg uni-mx-4 flex-center">
            <uni-icons type="videocam" color="#fff" size="25rpx" class='uni-mt-1'></uni-icons>
            <text>动作示范视频</text>
          </view>
          <view class="amount">
            <uni-number-box :min="1" :max="100" />
            <text class="amount_unit uni-primary-bg flex-center">组</text>
          </view>
        </view>
        <view class="border-line uni-my-14"></view>
        <view class="publish_select_btn">
          <com-button type='primary' size='mini' width='235rpx' height='67rpx' @click='handleReset'>重置内容</com-button>
          <com-button size="mini" type='warning' width='235rpx' height='67rpx'>
            确认发布
          </com-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed
  } from 'vue'
  import {
    formatDate
  } from '@/libs/day.js'
  import UserHead from '@/components/teach/user-head'

  const trainGoalList = [{
    value: 0,
    text: '0'
  }, {
    value: 1,
    text: '1'
  }, {
    value: 2,
    text: '2'
  }]

  const form = reactive({
    hwDate: [],
    train: '',
    actionPoint: ''
  })

  const startDate = computed(() => {
    return formatDate(Date.now()).fullDate
  })


  const handleDateChange = (val) => {
    form.hwDate = val
    console.log(form.hwDate);
  }

  const handleTrainChange = () => {

  }

  const handlePoint = (val) => {

  }

  const handleReset = () => {

  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100vh;
    background-color: $uni-bg-color-grey;
    padding: 45rpx 38rpx 20rpx 38rpx;
  }

  .publish {
    width: 100%;
    background-color: #fff;

    &_edit {
      margin-top: 24rpx;
      width: 100%;
      height: 49rpx;
      background-color: #ffa932;
      color: #fff;
      line-height: 49rpx;
      text-align: center;
    }

    &_calendar {
      width: 100%;

      ::v-deep.uni-calendar-item__weeks-box-item {
        width: 70rpx;
        height: 80rpx;
      }

      ::v-deep.uni-calendar-item__weeks-lunar-text {
        display: none;
      }
    }

    &_select {
      padding: 29rpx 38rpx;

      &_btn {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .publish_select_content {
    height: 26px;
    font-size: $uni-font-size-sm;
    display: flex;
    color: #fff;

    .title {
      width: 200rpx;
    }

    .video {
      width: 180rpx;
    }

    .amount {
      flex: 1;
      @extend %flexCenter;

      &_unit {
        width: 40rpx;
        height: 100%;
      }
    }
  }

  .seat {
    height: 18rpx;
  }
</style>
