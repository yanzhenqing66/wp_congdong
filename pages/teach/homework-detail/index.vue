<template>
  <view class="hwdetail">
    <view class="hwdetail_title">作业详情</view>
    <HomeworkItem />
    <view class="hwdetail_tab uni-mt-8">
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text">
      </uni-segmented-control>
    </view>
    <view class="content uni-mt-8">
      <view v-show="current === 0">
        <HomeworkItemDetail />
      </view>
      <view v-show="current === 1">
        选项卡2的内容
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive
  } from 'vue'
  import HomeworkItem from '@/components/teach/homework-item'
  import HomeworkItemDetail from '@/components/teach/homework-item-detail.vue'

  const current = ref(0)

  const items = reactive(['未交作业', '已交作业'])

  const onClickItem = val => {
    current.value = val.currentIndex
  }
</script>

<style lang="scss" scoped>
  .hwdetail {
    width: 100%;
    height: 100%;
    background-color: $uni-bg-color-grey;
    padding: 0 38rpx;

    &_title {
      width: 100%;
      height: 75rpx;
      background-color: $uni-color-primary;
      opacity: 0.9;
      color: #fff;
      font-size: $uni-font-size-lg;
      line-height: 75rpx;
      text-align: center;
      margin-bottom: 50rpx;
    }

    &_tab {
      background-color: #fff;
    }
  }
</style>
