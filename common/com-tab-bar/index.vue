<template>
  <view class="uni-tabbar">
    <view class="uni-tabbar-item" v-for="(item, index) in tabbar" :key="index" @tap="changeTab(item.pagePath)">
      <view class="uni-tabbar-bd">
        <view class="uni-tabbar-icon">
          <image v-if="item.pagePath === curPath" class="icon-img" mode="aspectFit" :src="item.selectedIconPath" />
          <image v-else class="icon-img" mode="aspectFit" :src="item.iconPath" />
        </view>
      </view>
      <view class="uni-tabbar-label" :class="{ active: item.pagePath === curPath }">{{ item.text }}</view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive
  } from 'vue'

  const curPath = ref('/pages/teach/student/index')

  const tabbar = reactive([{
      "pagePath": "/pages/teach/student/index",
      "text": "我的学员",
      "iconPath": "/static/images/tabbar/stu.png",
      "selectedIconPath": "/static/images/tabbar/sel-stu.png"
    },
    {
      "pagePath": "/pages/teach/hw/index",
      "text": "我的作业",
      "iconPath": "/static/images/tabbar/hw.png",
      "selectedIconPath": "/static/images/tabbar/sel-hw.png"
    }
  ])


  const changeTab = (url) => {
    uni.redirectTo({
      url
    })
  }
</script>

<style lang="scss" scoped>
  .uni-tabbar {
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    border-top: solid 1rpx rgba(0, 0, 0, .1);
    // background-color: RGBA(0, 0, 0, .5);
    background-color: $uni-color-warning;

    .uni-tabbar-item {
      // width: 25%;
      height: 100rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    // .uni-tabbar-icon {
    //   height: 50rpx;
    // }

    .icon {
      display: inline-block;
    }

    .uni-tabbar-label {
      line-height: 24rpx;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;

      &.active {
        font-weight: 600;
        color: #fff;
      }
    }

    .icon-img {
      width: 40rpx;
      height: 40rpx;
    }
  }
</style>
