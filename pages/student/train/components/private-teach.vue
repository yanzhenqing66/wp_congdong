<template>
  <view class="priTeach uni-px-15 uni-pb-15" v-for="item in courseList" :key="item.id">
    <com-head-goal></com-head-goal>
    <TeachHead :data='item' />
    <view class="border-line uni-my-10"></view>
    <view class="flex-bewteen flex-align-center">
      <view class="price bold">签约价格：<text class="uni-primary">{{item.actualPrice}}</text><text class="unit">元</text>
      </view>
      <com-button type='primary' width='184rpx' height='51rpx' className='uni-radius-pill' @click='goPage(item.id)'>签约教练
      </com-button>
    </view>
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

  const user = uni.getStorageSync('user')
  const courseList = ref([])

  const getCourseList = () => {
    fetchTeachCourseList({
      studentId: user.id
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
