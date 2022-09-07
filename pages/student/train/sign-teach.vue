<template>
  <com-stu-layout>
    <com-title bgColor='#F5A33B'>签约教练</com-title>
    <view class="sign">
      <com-head-goal></com-head-goal>
      <TeachHead />
      <view class="border-line uni-my-12"></view>
      <view>
        <view class="sign_price-item">
          <view class="price uni-pr-12">
            <view>
              <view>
                <text class="duration">3个月 / <text class="uni-primary">¥</text></text>
                <text class="price_cur">1298</text>
              </view>
              <view class="price_deduct">最高抵扣学分：699学分</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import TeachHead from './components/teach-head.vue'
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
      border: 2px solid $uni-color-primary;

      .price {
        width: 100%;
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
