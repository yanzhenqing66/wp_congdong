<template>
  <view class="preson_info flex flex-bewteen" v-if="user.id">
    <view class="flex">
      <com-image :src='userInfo.userInfo.avatar' alt='' width='122rpx' height='121rpx' className='uni-radius-pill'>
      </com-image>
      <view class="flex flex-col flex-evenly uni-ml-8">
        <text class="text-lg">{{userInfo.userInfo.nikeName}}</text>
        <text class="grey text-sm">学号：{{userInfo.userInfo.id}}</text>
      </view>
    </view>
    <view class="flex flex-col flex-evenly preson_info_assets" @click="handleGoScore">
      <text class="grey text-sm">点击查看我的资产明细</text>
      <view class="mark bold">{{userInfo.userInfo.totalScore}} 分</view>
    </view>
    
  </view>
  <view v-else class='preson_info flex-align-center'>
    <com-image :src='1' alt='' width='122rpx' height='121rpx' className='uni-radius-pill'></com-image>
    <text class="bold uni-ml-5 text-lg" @click="handleLogin">登录查看积分</text>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchPresonData
  } from '@/api/path/student.js'

  const user = uni.getStorageSync('user')

  const userInfo = ref({})

  onMounted(() => {
    fetchPresonData(user.id).then(res => {
      userInfo.value = res
    })
  })

  const handleGoScore = () => {
    uni.navigateTo({
      url: './score'
    })
  }
  
  const handleLogin = () => {
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }
</script>

<style scoped lang="scss">
  .preson_info {
    width: 100%;
    height: 180rpx;
    background: rgba(255, 255, 255, .8);
    padding: 29rpx;
    border-radius: 4px;
    color: #333;

    &_assets {
      align-items: flex-end;

      .mark {
        padding: 13rpx 15rpx;
        background-color: $uni-color-primary;
        color: #fff;
        border-radius: 8px;
      }
    }
  }
</style>
