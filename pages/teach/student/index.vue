<template>
  <com-teach-layout curPath='/pages/teach/student/index'>
    <view class="container">
      <view class="search_box">
        <uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="query.date"
          @change="handleDate" />
        <view class="search">
          <com-cur-date :curDate='query.date'></com-cur-date>
          <view class="search_bar">
            <uni-easyinput v-model="query.search" placeholder="搜索学员" class="search_bar_input" :clearable="false">
            </uni-easyinput>
            <button class="search_bar_btn" size="mini" @click="goSearch">
              <uni-icons type="search" size="19" color="#fff"></uni-icons>
            </button>
          </view>
        </view>
      </view>
      <view class="container_list">
        <template v-for="i in listData" :key="i.id">
          <stu-list :data='i' :nowDate='query.date'></stu-list>
        </template>
      </view>
    </view>
  </com-teach-layout>
</template>

<script setup>
  import { onShow } from "@dcloudio/uni-app"
  import {
    ref,
    reactive,
    watch,
    onMounted
  } from 'vue'
  import {
    fetchStuList
  } from '@/api/path/teach.js'
  import StuList from './components/stu-list'
  
  import {
    formatDate,
    formatStr,
    getCurDay
  } from '@/libs/day.js'
  
  const query = reactive({
    date: getCurDay(),
    search: ''
  })
  const listData = ref([])

  const handleDate = (val) => {
    query.date = val
    getStulist()
  }

  const goSearch = () => {
    getStulist()
  }

  onMounted(() => {
    getStulist()
  })
  
  onShow(() => {
    getStulist()
  })
  
  const getStulist = () => {
    const user = uni.getStorageSync('user')
    const params = {
      teacherId: user.id,
      queryDate: query.date,
      name: query.search
    }
    fetchStuList(params).then(res => {
      const data = res || []
      listData.value = data
    })
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;

    &_list {
      width: 100%;
      padding: 20rpx 38rpx;
    }
  }
  
  .search_box {
    position: sticky;
    top: 0;
    z-index: 9;
    padding: 20rpx 38rpx;
    background-color: #fff;
    
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
  }
</style>
