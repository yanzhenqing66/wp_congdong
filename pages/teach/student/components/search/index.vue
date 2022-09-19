<template>
  <view class="search_box">
    <uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="date"
      @change="handleDateChange" />
    <view class="search">
      <com-cur-date :curDate='date'></com-cur-date>
      <view class="search_bar">
        <uni-easyinput v-model="search" placeholder="搜索学员" class="search_bar_input" :clearable="false">
        </uni-easyinput>
        <button class="search_bar_btn" size="mini" @click="goSearch">
          <uni-icons type="search" size="19" color="#fff"></uni-icons>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
  } from 'vue'
  import {
    formatDate,
    formatStr
  } from '@/libs/day.js'

  const search = ref('')
  const date = ref(Date.now())

  const emit = defineEmits(['handleSearch', 'handleDate'])

  const handleDateChange = (val) => {
    date.value = val
    emit('handleDate')
  }

  const goSearch = () => {
    emit('handleSearch')
  }

  defineExpose({
    search,
    date
  })
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
