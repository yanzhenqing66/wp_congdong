<template>
  <view class="stu">
    <com-stu-no>NO.000000</com-stu-no>
    <view class="stu_detail">
      <com-image src='' width='95rpx' height='95rpx' className='uni-radius-pill'></com-image>
      <view class="stu_detail_info">
        <text class="stu_detail_info_title">丰台小乔丹</text>
        <text class="stu_detail_info_time">签约时间：20220906～20230906</text>
      </view>
    </view>
    <view class="border-line uni-my-12"></view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
  .stu {
    position: relative;
    width: 100%;
    height: 161rpx;
    background-color: #fff;
    padding: 0 30rpx;

    &_detail {
      padding-top: 45rpx;
      display: flex;

      &_info {
        flex: 1;
        margin-left: 13rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // font-size: 10rpx;

        &_title {
          font-size: $uni-font-size-lg;
        }

        &_time {
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
      }
    }
  }
</style>
