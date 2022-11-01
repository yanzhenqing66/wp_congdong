<template>
  <com-stu-layout headShow>
    <view class="uni-px-12">
      <PersonHeader />
      <view class="preson_course uni-mt-8">
        <view class="bold text-lg">累计训练</view>
        <view class="border-line uni-my-14"></view>
        <view class="preson_course_mark flex flex-bewteen">
          <view class="train-days flex-center">
            <view class="mark-box flex-center flex-col">
              <text class="days">{{userInfo.totalTrain}}</text>
              <text>累计训练</text>
              <text class="text-sm">(天)</text>
            </view>
          </view>
          <view class="comment-num flex-center">
            <view class="mark-box flex-center flex-col">
              <text class="num">{{userInfo.totalShare}}</text>
              <text>获得点评</text>
              <text class="text-sm">(次)</text>
            </view>
          </view>
        </view>
        <view class="border-line uni-my-14"></view>
      </view>
      <view class="person_more uni-mt-8">
        <view class="flex flex-bewteen flex-align-center" @click="handleGoOrder">
          <view class="text-lg flex-align-center">
            <uni-icons type='cart' size='23' class='uni-mr-7'></uni-icons>
            购买记录
          </view>
          <uni-icons type="forward"></uni-icons>
        </view>
        <view class="border-line uni-my-14"></view>
        <view>
          <view class="flex flex-bewteen" v-for="item in userInfo.customers" :key="item">
            <view class="text-lg flex-align-center">
              <uni-icons type='headphones' size='23' class='uni-mr-7'></uni-icons>
              客服微信
            </view>
            <text class="uni-primary bold text-lg">{{item}}</text>
          </view>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchPresonData
  } from '@/api/path/student.js'
  import PersonHeader from './components/header.vue'

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

  const handleGoOrder = () => {
    uni.navigateTo({
      url: './order'
    })
  }
</script>

<style lang="scss" scoped>
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

  .preson_course {
    width: 100%;
    height: 525rpx;
    background: rgba(255, 255, 255, .8);
    padding: 29rpx;
    border-radius: 4px;
    color: #333;

    .train-days {
      width: 300rpx;
      height: 300rpx;
      background: linear-gradient(to bottom right, #FFBC01, #DFE0E4);
      border-radius: 50%;

      .days {
        color: #FFBC01;
        font-size: 48rpx;
      }
    }

    .comment-num {
      width: 300rpx;
      height: 300rpx;
      background: linear-gradient(to bottom right, $uni-color-primary, #D9DEEC);
      border-radius: 50%;

      .num {
        color: $uni-color-primary;
        font-size: 48rpx;
      }
    }

    .mark-box {
      width: 220rpx;
      height: 220rpx;
      background: #fff;
      border-radius: 50%;
    }
  }

  .person_more {
    width: 100%;
    height: 256rpx;
    background: rgba(255, 255, 255, .8);
    padding: 29rpx;
    border-radius: 4px;
    color: #333;
  }

  .border-line {
    border-color: #72A1FB;
  }
</style>
