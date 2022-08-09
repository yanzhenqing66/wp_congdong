<template>
  <view class="container">
    <teach-search></teach-search>
    <view class="container_list">
      <template v-for="i in 30" :key="i">
        <stu-list></stu-list>
      </template>
    </view>
  </view>
</template>

<script setup>
  import TeachSearch from './components/search'
  import StuList from './components/stu-list'
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
