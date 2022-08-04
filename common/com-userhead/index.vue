<template>
  <view class="stu">
    <com-stu-no>NO.000000</com-stu-no>
    <view class="stu_detail">
      <image src="/static/images/teach/calendar.png" class="stu_detail_avatar"></image>
      <view class="stu_detail_info">
        <text class="stu_detail_info_title">丰台小乔丹</text>
        <text class="stu_detail_info_time">签约时间：20220906～20230906</text>
      </view>
    </view>
    <view class="stu_line"></view>
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

      &_avatar {
        width: 95rpx;
        height: 95rpx;
      }

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

    &_line {
      width: 100%;
      border: 1px dashed $uni-text-color-grey;
      margin-top: 20rpx;
      margin-bottom: 25rpx;
    }
  }
</style>
