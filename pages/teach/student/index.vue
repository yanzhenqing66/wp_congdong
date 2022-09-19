<template>
  <com-teach-layout curPath='/pages/teach/student/index'>
    <view class="container">
      <teach-search ref="query" @handleSearch='handleSearch' @handleDate='handleDate'>
      </teach-search>
      <view class="container_list">
        <template v-for="i in listData" :key="i.id">
          <stu-list :data='i'></stu-list>
        </template>
      </view>
    </view>
  </com-teach-layout>
</template>

<script setup>
  import {
    ref,
    reactive,
    watch,
    onMounted
  } from 'vue'
  import {
    fetchStuList
  } from '@/api/path/teach.js'
  import TeachSearch from './components/search'
  import StuList from './components/stu-list'

  const query = ref(null)
  const listData = reactive([])

  const handleDate = () => {
    getStulist()
  }

  const handleSearch = () => {
    getStulist()
  }

  onMounted(() => {
    getStulist()
  })

  const getStulist = () => {
    const user = uni.getStorageSync('user')
    const {
      date,
      search
    } = query.value
    const params = {
      teacherId: user.id,
      queryDate: date,
      name: search
    }
    fetchStuList(params).then(res => {
      const data = res || []
      listData.length = 0
      listData.push(...data)
    })
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;

    &_list {
      width: 100%;
      padding: 20rpx 38rpx;
    }
  }
</style>
