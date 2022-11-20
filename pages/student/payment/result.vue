<template>
  <com-stu-layout>
    <view class="payment-result">
      <image src="/static/images/success.png" class="logo"></image>
      <view class="uni-my-20">您已成功支付</view>
      <view class="price">￥{{price}}</view>
      <view>感谢您对丛动体育的信任</view>
      <view class="enter">5秒后进入调查问卷页面</view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import { ref } from 'vue'
  
  const price = ref('')
  
  onLoad(options => {
    price.value = options.price
  })
  
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages/login/questions'
    })
  }, 5000)
</script>

<style lang="scss" scoped>
  .payment-result {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 70rpx;
    background-color: #fff;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 150rpx 0;
    
    .logo {
      width: 220rpx;
      height: 220rpx;
    }
    
    .price {
      color: $uni-color-primary;
      font-size: $uni-font-size-lg;
      font-weight: bold;
      margin-bottom: 40rpx;
    }
    
    .enter {
      color: $uni-color-primary;
      margin-top: 50rpx;
    }
  }
</style>