<template>
  <view class="stu">
    <com-stu-no>NO.{{data.userNo}}</com-stu-no>
    <view class="stu_detail">
      <com-image :src='data.avatar' width='95rpx' height='95rpx'></com-image>
      <view class="stu_detail_info">
        <text class="stu_detail_info_title">{{data.nikeName}}</text>
        <text class="stu_detail_info_time">签约时间： {{curDate(data.startTime, data.endTime)}}</text>
      </view>
    </view>
    <!-- <view class="border-line uni-my-12"></view> -->
  </view>
</template>

<script setup>
  import {
    onMounted,
    computed
  } from 'vue'
  import {
    formatDate
  } from '@/libs/day.js'

  defineProps({
    data: Object,
    default: {}
  })

  const curDate = (start, end) => {
    return formatDate(start).year + formatDate(start).formatMM + formatDate(start)
      .formatDD + ' - ' + formatDate(end).year + formatDate(end).formatMM + formatDate(end).formatDD
  }
</script>

<style lang="scss" scoped>
  .stu {
    position: relative;
    width: 100%;
    height: 161rpx;
    background-color: #fff;
    padding: 0 30rpx;

    &_detail {
      padding-top: 45rpx;
      display: flex;

      &_info {
        flex: 1;
        margin-left: 13rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // font-size: 10rpx;

        &_title {
          font-size: $uni-font-size-lg;
        }

        &_time {
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
      }
    }
  }
</style>
