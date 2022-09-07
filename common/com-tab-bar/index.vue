<template>
  <view class="uni-tabbar">
    <view class="uni-tabbar-item" v-for="(item, index) in tabbar" :key="index" @tap="changeTab(item.pagePath)">
      <view class="uni-tabbar-bd">
        <view class="uni-tabbar-icon">
          <image v-if="item.pagePath === pagePath" class="icon-img" mode="aspectFit" :src="item.selectedIconPath" />
          <image v-else class="icon-img" mode="aspectFit" :src="item.iconPath" />
        </view>
      </view>
      <view class="uni-tabbar-label" :class="{ active: item.pagePath === pagePath }">{{ item.text }}</view>
    </view>
  </view>
</template>

<script setup>
  import {
    reactive
  } from 'vue'

  const props = defineProps({
    pagePath: {
      type: String,
      default: '/pages/student/home/index',
      required: true
    },
    userIdentity: { // 当前角色
      type: Number,
      default: 0
    }
  })

  const emit = defineEmits('onTabTap')


  const tabbar = reactive([{
      "pagePath": "/pages/student/home/index",
      "text": "首页",
      "iconPath": "/static/images/tabbar/stu.png",
      "selectedIconPath": "/static/images/tabbar/sel-stu.png"
    },
    {
      "pagePath": "/pages/student/course/index",
      "text": "课程",
      "iconPath": "/static/images/tabbar/stu.png",
      "selectedIconPath": "/static/images/tabbar/sel-stu.png"
    },
    {
      "pagePath": "/pages/student/train/index",
      "text": "训练",
      "iconPath": "/static/images/tabbar/stu.png",
      "selectedIconPath": "/static/images/tabbar/sel-stu.png"
    },
    {
      "pagePath": "/pages/student/person/index",
      "text": "成长",
      "iconPath": "/static/images/tabbar/stu.png",
      "selectedIconPath": "/static/images/tabbar/sel-stu.png"
    }
  ])


  const changeTab = (url) => {
    uni.redirectTo({
      url
    })
    // uni.showLoading({
    //   title: "加载中..."
    // })
    // success: () => {
    //   uni.hideLoading()
    // }

    // emit('onTabTap')
  }
</script>

<style lang="scss" scoped>
  .uni-tabbar {
    position: fixed;
    bottom: 0;
    z-index: 50;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    border-top: solid 1rpx rgba(0, 0, 0, .1);
    background-color: RGBA(0, 0, 0, .5);

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
