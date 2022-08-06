<template>
  <view class="homework">
    <button size="mini" class="homework_publish">发布作业</button>
    <view class='homework_tab uni-mt-15'>
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text">
      </uni-segmented-control>
    </view>

    <view class="homework_content">
      <view v-show="currentIndex === 0">
        <HomeworkItem :handleBtn='true' />
      </view>
      <view v-show="currentIndex === 1">
        选项卡2的内容
      </view>
      <view v-show="currentIndex === 2">
        选项卡3的内容
      </view>
    </view>
  </view>
</template>

<script setup>
  import HomeworkItem from '@/components/teach/homework-item'

  import {
    ref,
    reactive
  } from 'vue'

  const currentIndex = ref(0)
  const items = reactive(['默认时间', '尚未提交', '尚未点评'])

  const onClickItem = (val) => {
    currentIndex.value = val.currentIndex
  }
</script>

<style lang="scss" scoped>
  .homework {
    padding: 38rpx 38rpx 0 38rpx;
    height: 100%;
    background-color: $uni-bg-color-grey;

    &_publish {
      width: 444rpx;
      height: 67rpx;
      margin: 0 auto;
      background-color: $uni-color-warning;
      color: #fff;
      @extend %flexCenter;
    }

    &_tab {
      width: 100%;
      background-color: #fff;
    }

    &_content {
      width: 100%;
      margin-top: 50rpx;
      // min-height: 100%;
    }
  }
</style>
