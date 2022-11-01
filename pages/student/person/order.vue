<template>
  <com-stu-layout>
    <view class="order uni-pa-12">
      <Header />
      <view>
        <view class="order_title">我的购买记录</view>
        <view class="order_content" v-for="(item, index) in data.orderRecords" :key="index">
          <view class="base-info">
            <text>{{item.month}}</text>
            <text>本月购买 <text class="blod uni-warning">{{item.totalAmount}}</text></text>
          </view>
          <view class="item uni-py-8" v-for="(item2, index) in item.orders">
            <view class="flex-col">
              <text>签约教练: {{item2.courseName}}</text>
              <text>订单编号: {{item2.orderNo}}</text>
            </view>
            <view class="flex-col price">
              <text>{{formatCurDate(item2.orderTime)}}</text>
              <text>{{item2.actualPrice}}</text>
            </view>
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
    fetchOrderList
  } from '@/api/path/student.js'
  import {
    formatDate
  } from '@/libs/day.js'
  import Header from './components/header.vue'

  const user = uni.getStorageSync('user')

  const data = ref({})

  onMounted(() => {
    fetchOrderList(user.id).then(res => {
      data.value = res
    })
  })

  const formatCurDate = (data) => {
    return formatDate(data).year + '-' + formatDate(data).formatMM + '-' + formatDate(data).formatDD
  }
</script>

<style scoped lang="scss">
  .order {
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

        .price {
          align-items: flex-end;
        }
      }
    }
  }
</style>
