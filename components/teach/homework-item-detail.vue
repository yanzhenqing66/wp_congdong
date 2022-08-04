<template>
  <view class="hwIDetail">
    <view class="hwIDetail_stu">
      <image src="/static/images/teach/calendar.png" class="hwIDetail_stu_avatar"></image>
      <view class="hwIDetail_stu_info">
        <view class="hwIDetail_stu_info_con">
          <text class="nickname uni-mr-5">丰台小乔丹</text>
          <text class="no_title uni-mr-5">学员编号</text>
          <text class="no">NO.00000000</text>
        </view>
        <view class="hwIDetail_stu_info_status">
          <text class="name">学生姓名：戴永鸣</text>
          <text class="status">已签约</text>
        </view>
      </view>
    </view>
    <view class="hwIDetail_line uni-my-10"></view>
    <view class="hwIDetail_status">
      <view>
        <view>作业状态：未提交</view>
        <view>点评状态：未点评</view>
      </view>
      <view>学分：32</view>
      <button>提醒</button>
    </view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .hwIDetail {
    width: 100%;
    padding: 20rpx 35rpx;
    background-color: #fff;

    &_stu {
      display: flex;

      &_avatar {
        width: 95rpx;
        height: 95rpx;
        border-radius: 100px;
        margin-right: 12rpx;
      }
    }

    .hwIDetail_stu_info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &_con {
        display: flex;
        align-items: center;

        .nickname {
          font-size: $uni-font-size-lg;
        }

        .no_title {
          padding: 5rpx 8rpx;
          background-color: $uni-color-primary;
          color: #fff;
          font-size: $uni-font-size-sm;
        }

        .no {
          color: $uni-color-primary;
          font-size: $uni-font-size-sm;
        }
      }

      &_status {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name {
          // font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }

        .status {
          padding: 2px 4px;
          background-color: $uni-color-primary;
          font-size: $uni-font-size-sm;
          color: #fff;
          border-radius: 100px;
        }
      }
    }

    &_line {
      width: 100%;
      border: 1px dashed $uni-text-color-grey;
    }
  }
</style>
