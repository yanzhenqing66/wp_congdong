<template>
  <com-teach-layout>
    <view class="homework">
      <view class="homework_top">
        <com-button size='mini' type='warning' className='homework_publish uni-radius-pill uni-mt-15' width='444rpx'
          height='67rpx'>
          发布作业</com-button>
        <view class='uni-mt-15'>
          <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text">
          </uni-segmented-control>
        </view>
      </view>

      <view class="uni-pa-19 uni-mt-14">
        <view v-show="currentIndex === 0">
          <view v-for="i in 50" :key="i" class='homework_con_item'>
            <HomeworkItem :handleBtn='true' />
          </view>
        </view>
        <view v-show="currentIndex === 1">
          选项卡2的内容
        </view>
        <view v-show="currentIndex === 2">
          选项卡3的内容
        </view>
      </view>
    </view>
  </com-teach-layout>
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
    width: 100%;
    min-height: 100%;
    background-color: $uni-bg-color-grey;

    &_top {
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 9;
    }

    ::v-deep.homework_publish {
      margin: 0 auto;
    }

    .homework_con_item {
      margin-bottom: 56rpx;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
</style>
