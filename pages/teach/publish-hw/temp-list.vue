<template>
  <uni-popup ref="popup" type="bottom">
    <view class="temp-list uni-pa-19">
      <template v-for="item in tempList" :key="item.id">
        <view class="temp-list_item flex flex-bewteen flex-align-center" @click="addHw(item)">
          <view>
            <view class="name">
              作业视频名称: {{item.content}}
            </view>
            <view>组数: {{item.sets}}</view>
          </view>
          <!-- <uni-data-checkbox v-model="radio1"></uni-data-checkbox> -->
        </view>
      </template>
    </view>
  </uni-popup>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchHwTempDetailList
  } from '@/api/path/teach.js'

  const emit = defineEmits(['updTempDetal'])

  const popup = ref()
  const tempList = ref([])
  const tempListFreeze = []

  onMounted(() => {
    fetchHwTempDetailList().then(res => {
      tempList.value = res
      tempListFreeze.push(...res)
    })
  })

  const open = (tempDetailList) => {
    const detailIdList = tempDetailList.map(item => item.id)
    const newTempList = tempListFreeze.filter(item => !detailIdList.includes(item.id))
    tempList.value = newTempList

    popup.value.open()
  }

  const addHw = (data) => {
    emit('updTempDetal', data)
    popup.value.close()
  }

  defineExpose({
    open
  })
</script>

<style scoped lang="scss">
  .temp-list {
    background-color: #fff;
    min-height: 65vh;
    max-height: 70vh;
    overflow-y: auto;

    &_item {
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 20rpx 10rpx;
      margin-bottom: 16rpx;
    }
  }
</style>
