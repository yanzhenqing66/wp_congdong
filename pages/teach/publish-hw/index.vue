<template>
  <view class="container">
    <view class="publish">
      <com-userhead></com-userhead>
      <view class="publish_edit">编辑作业信息</view>
      <view class="publish_calendar">
        <uni-calendar v-model="form.hwDate" :insert="true" range :showMonth="false" @change="handleDateChange" />
      </view>
      <view class="publish_select">
        <uni-data-select v-model="form.train" :localdata="trainGoalList" @change="handleTrainChange" placeholder="训练目标">
        </uni-data-select>
        <view class="seat"></view>
        <uni-easyinput trim="all" v-model="value" placeholder="填写动作要点" @input="input"></uni-easyinput>
        <view class="seat"></view>
        <view class="publish_select_content">
          <view class="publish_select_content_title"> 体前变向运球 </view>
          <view class="publish_select_content_video"> 动作示范视频 </view>
          <view class="publish_select_content_amount">
            <uni-number-box :min="0" :max="100" />
            <text class="publish_select_content_amount_unit">组</text>
          </view>
        </view>
        <view class="border-line uni-my-14"></view>
        <view class="publish_select_btn">
          <!-- <button class="publish_select_btn_reset" size="mini">重置内容</button> -->
          <com-button type='primary' size='mini' width='235rpx' height='67rpx'>重置内容</com-button>
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
    reactive
  } from 'vue'

  const trainGoalList = reactive([{
    value: 0,
    text: '0'
  }, {
    value: 1,
    text: '1'
  }, {
    value: 2,
    text: '2'
  }])

  const form = reactive({
    hwDate: [],
    train: ''
  })


  const handleDateChange = (val) => {
    form.hwDate = val
    console.log(form);
  }

  const handleTrainChange = () => {

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
        border-radius: 100px;
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

    &_title {
      width: 173rpx;
      color: #fff;
      background-color: $uni-color-primary;
      @extend %flexCenter;
    }

    &_video {
      margin: 0 8rpx;
      width: 210rpx;
      flex: 1;
      color: #fff;
      background-color: $uni-color-warning;
      @extend %flexCenter;
    }

    &_amount {
      flex: 1;
      @extend %flexCenter;

      &_unit {
        width: 40rpx;
        height: 100%;
        background-color: $uni-color-primary;
        @extend %flexCenter;
      }
    }
  }

  .seat {
    height: 18rpx;
  }
</style>
