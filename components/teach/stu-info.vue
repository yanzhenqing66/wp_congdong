<template>
  <view class="stu">
    <com-image :src='data.avatar' width='95rpx' height='95rpx' className='uni-radius-pill uni-mr-6'></com-image>
    <view class="stu_info">
      <view class="stu_info_con">
        <text class="nickname uni-mr-5">{{data.nikeName}}</text>
        <text class="no_title uni-mr-5">学员编号</text>
        <text class="no">NO.{{data.userNo}}</text>
      </view>
      <view class="stu_info_status">
        <text class="name">学生姓名：{{data.userName}}</text>
        <text class="status">
          {{data.contractType === 10 ? '被动签约' : (data.contractType === 20 ? '主动签约' : '未签约')}}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      default: {}
    }
  })
</script>

<style lang="scss" scoped>
  .stu {
    display: flex;
  }

  .stu_info {
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
</style>
