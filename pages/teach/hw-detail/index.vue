<template>
  <view class="hwdetail">
    <com-title>作业详情</com-title>
    <HomeworkItem />
    <view class="hwdetail_tab uni-mt-8">
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text">
      </uni-segmented-control>
    </view>
    <view class="content uni-mt-8">
      <view v-show="current === 0">
        <HomeworkItemDetail :current='current' />
      </view>
      <view v-show="current === 1">
        <HomeworkItemDetail :current='current' />
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

    &_tab {
      background-color: #fff;
    }
  }
</style>
