<template>
  <view class="search_box">
    <uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="date"
      @change="handleDateChange" />
    <view class="search">
      <view>
        <image src="/static/images/teach/calendar.png" class="search_calendar"></image>
        <text class="search_date">{{showTime.formatMM}}月{{showTime.formatDD}}日 {{showTime.weekday}}</text>
        <uni-tag v-show="showTime.formatDD === nowDay" text="今天" size="small" type="primary" circle></uni-tag>
      </view>
      <view class="search_bar">
        <uni-easyinput v-model="searchVal" placeholder="搜索学员" class="search_bar_input" :clearable="false">
        </uni-easyinput>
        <button class="search_bar_btn" size="mini" @click="searchClick">
          <uni-icons type="search" size="19" color="#fff"></uni-icons>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue'
  import {
    formatDate,
    formatStr
  } from '@/libs/day.js'

  const searchVal = ref('')

  const date = ref(Date.now())

  const nowDay = computed(() => formatDate(Date.now()).formatDD)

  const showTime = computed(() => {
    const {
      formatMM,
      formatDD,
      weekday
    } = formatDate(date.value)
    return {
      formatMM,
      formatDD,
      weekday
    }
  })

  const handleDateChange = (val) => {
    date.value = val
  }

  const searchClick = () => {
    console.log(searchVal.value)
  }
</script>

<style scoped lang="scss">
  .search_box {
    position: sticky;
    top: 0;
    z-index: 9;
    padding: 20rpx 38rpx;
    background-color: #fff;
  }

  .search {
    margin-top: 15rpx;
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 10rpx;
    font-size: 24rpx;

    &_calendar {
      width: 24rpx;
      height: 24rpx;
    }

    &_date {
      margin: 0 10rpx;
      color: #727171;
    }

    &_bar {
      width: 304rpx;
      display: flex;
      align-items: center;

      &_input {
        flex: 1;
      }

      &_btn {
        margin-left: -10rpx;
        width: 37px;
        height: 37px;
        background-color: $uni-color-primary;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 4rpx 4rpx 0;
      }
    }
  }
</style>
