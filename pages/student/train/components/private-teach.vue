<template>
  <view class="priTeach uni-px-15 uni-pb-15" v-for="item in courseList" :key="item.id">
    <com-head-goal></com-head-goal>
    <TeachHead :data='item' />
    <view class="border-line uni-my-10"></view>
    <template>
      <view class="flex-bewteen flex-align-center" v-if="item.contractType">
        <view class="bold text-lg uni-warning">签约日期：<text class="text-base">{{formatStartDate(item.startTime)}}</text>
        </view>
      <com-button type='warning' width='184rpx' height='51rpx' className='uni-radius-pill'>已签约
        </com-button>
      </view>
      <view class="flex-bewteen flex-align-center" v-else>
        <view class="price bold">签约价格：<text class="uni-primary">{{item.actualPrice}}</text><text class="unit">元</text>
        </view>
        <com-button type='primary' width='184rpx' height='51rpx' className='uni-radius-pill' @click='goPage(item.id)'>签约教练
        </com-button>
      </view>
    </template>
    
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchTeachCourseList
  } from '@/api/path/student.js'
  import TeachHead from './teach-head.vue'
  import {formatDate} from '@/libs/day.js'

  const user = uni.getStorageSync('user')
  const courseList = ref([])
  
  const formatStartDate = (date) => {
    if(!date) return
    const {year, formatMM, formatDD} = formatDate(date)
    return year + '年' + formatMM + '月' + formatDD + '日'
  }

  const getCourseList = () => {
    fetchTeachCourseList({
      studentId: user.id ?? ''
    }).then(res => {
      courseList.value = res
    })
  }

  onMounted(() => {
    getCourseList()
  })

  const goPage = (id) => {
    uni.navigateTo({
      url: '/pages/student/train/sign-teach?teacherId=' + id
    })
  }
</script>

<style lang="scss" scoped>
  .priTeach {
    position: relative;
    width: 100%;
    color: $uni-text-color;
    background: #fff;
    padding-top: 60rpx;
    color: #333;
    margin-top: 50rpx;
  }

  .price {
    font-size: $uni-font-size-lg;

    .unit {
      margin-left: 1em;
      font-size: $uni-font-size-sm;
    }
  }
</style>
