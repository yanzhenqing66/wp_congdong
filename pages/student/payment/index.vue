<template>
  <com-stu-layout>
    <view class="payment">
      <image src="/static/images/pay_logo.png" class="logo"></image>
      <view class="uni-my-20">您即将支付课程费用</view>
      <view class="price">￥{{data.price}}</view>
      <com-button type='warning' className='uni-radius-pill' :loading='data.loading' width='358rpx' height='74rpx' @click='handlePay'>确定支付
      </com-button>
      <view class="cancel">取消</view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import { reactive } from 'vue'
  import {
    createOrder
  } from '@/api/path/student.js'
  
  const user = uni.getStorageSync('user')
  
  const data = reactive({
    teacherId:'',
    courseId: '',
    teacherCourseId: '',
    price: '',
    loading: false
  })
  
  onLoad(options => {
    data.teacherId = options.teacherId
    data.courseId = options.courseId
    data.teacherCourseId = options.teacherCourseId
    data.price = options.price
  })
  
  const handlePay = () => {
    data.loading = true
    const params = {
      studentId: user.id,
      teacherId: data.teacherId,
      courseId: data.courseId,
      teacherCourseId: data.teacherCourseId,
      contractType: 20
    }
    createOrder(params).then(res => {
      data.loading = false
      if(res.code === 100000) {
        const result = res.data
        uni.requestPayment({
          provider: "wxpay", 
          package: result.payResult.packageValue,        // 固定值
          timeStamp: result.payResult.timeStamp,        // 时间戳（单位：秒）
          nonceStr: result.payResult.nonceStr, // 随机字符串
          signType: result.payResult.signType,
          paySign: result.payResult.paySign, // 签名，这里用的 MD5/RSA 签名
          success(res) {
            uni.navigateTo({
              url: `/pages/student/payment/result?price=${data.price}`
            })
          },
          fail(e) {
            data.loading = false
            uni.showToast({
              icon:'error',
              title:'支付失败，请重试'
            })
          }
        })
      }else {
        uni.showToast({
          icon:'error',
          title: res.msg
        })
      }
    }).catch(e => {
      data.loading = false
      uni.showToast({
        icon:'error',
        title:'支付失败，请重试'
      })
    })
  }
</script>

<style scoped lang="scss">
  .payment {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 70rpx;
    background-color: #fff;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 150rpx;
    
    .logo {
      width: 220rpx;
      height: 220rpx;
    }
    
    .price {
      color: $uni-color-primary;
      font-size: $uni-font-size-lg;
      font-weight: bold;
      margin-bottom: 100rpx;
    }
    
    .cancel {
      color: $uni-color-primary;
      margin-top: 50rpx;
    }
  }
</style>