<template>
  <com-stu-layout>
    <view class="score uni-pa-12">
      <PersonHeader />
      <view>
        <view class="score_title">我的积分明细</view>
        <view class="score_content" v-for="(item, index) in data.scoreRecords" :key="index">
          <view class="base-info">
            <text>{{item.month}}</text>
            <text>本月积分 <text class="blod uni-primary">{{item.totalScore}}</text></text>
            <text>获得 <text class="blod uni-warning">{{item.getScore}}</text></text>
            <text>兑换 <text>{{item.useScore}}</text></text>
          </view>
          <view class="item uni-py-8" v-for="(item2, index) in item.scores">
            <view class="flex-col">
              <text>{{item2.targetName}}</text>
              <text>作业编号: {{item2.targetNo}}</text>
            </view>
            <view class="flex-col score">
              <text>{{formatCurDate(item2.targetTime)}}</text>
              <text>{{item2.score}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {onPullDownRefresh} from '@dcloudio/uni-app'
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchPersonScore
  } from '@/api/path/student.js'
  import {
    formatDate
  } from '@/libs/day.js'
  import PersonHeader from './components/header.vue'

  const user = uni.getStorageSync('user')
  const data = ref({})

  onMounted(() => {
   getScore()
  })
  
  const getScore = () => {
    fetchPersonScore(user.id).then(res => {
      data.value = res
      uni.stopPullDownRefresh()
    })
  }
  
  onPullDownRefresh(() => {
    getScore()
  })

  const formatCurDate = (data) => {
    return formatDate(data).year + '-' + formatDate(data).formatMM + '-' + formatDate(data).formatDD
  }
</script>

<style scoped lang="scss">
  .score {
    &_title {
      margin-top: 30rpx;
      width: 100%;
      height: 70rpx;
      background-color: $uni-color-primary;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
    }

    &_content {
      background-color: #fff;
      color: #333;
      padding: 10rpx;

      .base-info {
        display: flex;
        justify-content: space-between;
        padding: 10rpx 0;
        border-bottom: 1px solid #f6f6f6;
      }

      .item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f6f6f6;

        .score {
          align-items: flex-end;
        }
      }
    }
  }
</style>
