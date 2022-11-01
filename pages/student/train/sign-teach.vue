<template>
  <com-stu-layout>
    <com-title bgColor='#F5A33B'>签约教练</com-title>
    <view class="sign">
      <com-head-goal></com-head-goal>
      <TeachHead :data='courseDetail' />
      <view class="border-line uni-my-12"></view>
      <view>
        <view class="sign_price-item uni-mb-12" v-for="item in courseDetail.courseDetailList" :key='item.id'
          @click="handleDoOrder(item)"
          :style="{border: (orderInfo.id === item.id ? '2px solid #007aff' : '2px solid #ccc')}">
          <view class="name">
            <text class="text">
              {{item.name}}
            </text>
            <view class="origin-price">原价: <text class="price">¥{{item.originalPrice}}</text></view>
          </view>
          <view class="price uni-pr-12">
            <view>
              <view>
                <text class="duration">3个月 / <text class="uni-primary">¥</text></text>
                <text class="price_cur">{{item.actualPrice}}</text>
              </view>
              <view class="price_deduct">最高抵扣学分：{{item.maximumDeduct}}学分</view>
            </view>
          </view>
        </view>
      </view>
      <view class="flex-center">
        <com-button type='primary' className='uni-radius-pill' width='358rpx' height='74rpx' @click='handlePay'>确定支付
        </com-button>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchCourseDetail,
    createOrder
  } from '@/api/path/student.js'
  import TeachHead from './components/teach-head.vue'

  const user = uni.getStorageSync('user')
  const teacherId = ref()
  const courseDetail = ref({})

  const orderInfo = ref({})

  onLoad((options) => {
    teacherId.value = options.teacherId
  })

  const handleDoOrder = (info) => {
    orderInfo.value = info
  }

  const handlePay = () => {
    const params = {
      studentId: user.id,
      teacherId: teacherId.value,
      courseId: orderInfo.value.courseId,
      teacherCourseId: orderInfo.value.id,
      contractType: 20
    }
    createOrder(params).then(res => {
      console.log(res);
    })
  }

  onMounted(() => {
    fetchCourseDetail({
      teacherId: teacherId.value
    }).then(res => {
      courseDetail.value = res
    })
  })
</script>

<style lang="scss" scoped>
  .sign {
    position: relative;
    width: 675rpx;
    margin: 0 auto;
    background: #fff;
    padding: 60rpx 38rpx 30rpx;
    color: $uni-text-color;

    &_price-item {
      width: 100%;
      height: 150rpx;
      border-radius: 6px;
      border: 2px solid #ccc;
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      .name {
        .text {
          padding: 0 20rpx;
          background-color: #F4A138;
          border-radius: 4px 0 0 0;
          color: #fff;
        }

        .origin-price {
          display: flex;
          align-items: center;
          font-size: $uni-font-size-sm;
          margin-top: 30rpx;
          margin-left: 12rpx;

          .price {
            margin-left: 5rpx;
            font-size: $uni-font-size-lg;
            color: #EA5539;
            font-weight: bold;
            text-decoration: line-through;
          }
        }
      }

      .price {
        // width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;

        &_cur {
          margin-left: 5rpx;
          font-size: 40rpx;
          color: $uni-color-primary;
          font-weight: bold;
        }

        &_deduct {
          padding: 7rpx 10rpx;
          background-color: $uni-color-primary;
          border-radius: 6px;
          color: #fff;
        }
      }
    }
  }
</style>
