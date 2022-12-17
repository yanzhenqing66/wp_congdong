<template>
  <view class="hwdetail">
    <com-title>作业详情</com-title>
    <HomeworkItem :data='hwInfo' />
    <view class="hwdetail_tab uni-mt-8">
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text">
      </uni-segmented-control>
    </view>
    <view class="content uni-mt-8">
      <view v-show="current === 0">
        <template v-for="i in unSubhwDetList" :key="i.id">
          <HomeworkItemDetail :current='current' :data="i" />
        </template>
      </view>
      <view v-show="current === 1">
        <template v-for="i in SubhwDetList" :key="i.id">
          <HomeworkItemDetail :current='current' :data='i' />
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchHwDetStuList
  } from '@/api/path/teach.js'
  import HomeworkItem from '@/components/teach/homework-item'
  import HomeworkItemDetail from '@/components/teach/homework-item-detail.vue'

  const items = ['未交作业', '已交作业']
  const current = ref(0)
  const homeworkId = ref()
  const hwInfo = ref({})
  const unSubhwDetList = ref([])
  const SubhwDetList = ref([])

  onLoad((options) => {
    homeworkId.value = options.homeworkId
  })

  onMounted(() => {
    getHwDetStuList()
  })

  const onClickItem = val => {
    current.value = val.currentIndex
  }

  const getHwDetStuList = () => {
    fetchHwDetStuList({
      homeworkId: homeworkId.value
    }).then(res => {
      hwInfo.value = {
        id: res.id,
        title: res.title,
        createTime: res.createTime,
        content: res.content
      }
      unSubhwDetList.value = res.unSubmitStudents
      SubhwDetList.value = res.submitStudents
    })
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
