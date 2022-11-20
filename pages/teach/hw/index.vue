<template>
  <com-teach-layout curPath='/pages/teach/hw/index'>
    <view class="homework">
      <view class="homework_top">
        <view class="class='uni-pa-19'">
          <uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="date"
            @change="handleDateChange" />
        </view>
      <!--  <com-button size='mini' type='warning' className='homework_publish uni-radius-pill uni-mt-15' width='444rpx'
          height='67rpx' @click='handleAllHw'>
          发布作业</com-button> -->
        <view class='uni-mt-15'>
          <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text">
          </uni-segmented-control>
        </view>
      </view>

      <view class="uni-pa-19 uni-mt-14" v-if="hwList.length">
        <view v-show="currentIndex === 0">
          <view v-for="i in hwList" :key="i.id" class='homework_con_item'>
            <HomeworkItem :handleBtn='true' :data='i' />
          </view>
        </view>
        <view v-show="currentIndex === 1">
          <view v-for="i in hwList" :key="i.id" class='homework_con_item'>
            <HomeworkItem :handleBtn='true' :data='i' />
          </view>
        </view>
        <view v-show="currentIndex === 2">
          <view v-for="i in hwList" :key="i.id" class='homework_con_item'>
            <HomeworkItem :handleBtn='true' :data='i' />
          </view>
        </view>
      </view>
    </view>
  </com-teach-layout>
</template>

<script setup>
  import HomeworkItem from '@/components/teach/homework-item'

  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchHwList
  } from '@/api/path/teach.js'
  import {
    getCurDay
  } from '@/libs/day.js'

  const currentIndex = ref(0)
  const items = ['默认时间', '尚未提交', '尚未点评']
  const date = ref(getCurDay())
  const hwList = ref([])

  const user = uni.getStorageSync('user')

  const handleDateChange = (val) => {
    date.value = val
    getHwList()
  }

  onMounted(() => {
    getHwList()
  })

  const onClickItem = (val) => {
    currentIndex.value = val.currentIndex
    getHwList()
  }

  const getHwList = () => {
    fetchHwList({
      teacherId: user.id,
      date: date.value,
      type: currentIndex.value === 1 ? 1 : (currentIndex.value === 2 ? 2 : '')
    }).then(res => {
      hwList.value = res
    })
  }
  
  // const handleAllHw = () => {
  //   uni.navigateTo({
  //     url: `/pages/teach/publish-hw/index?type=3`,
  //   })
  // }
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
