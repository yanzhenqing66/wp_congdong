<template>
  <com-stu-layout headShow>
    <view>
      <text>为了您更好的体验约课服务，请填准确填写以下信息</text>
    </view>
    <view class="border-line uni-my-12"></view>
    <uni-forms :modelValue="formData">
      <uni-forms-item></uni-forms-item>
    </uni-forms>
  </com-stu-layout>
</template>

<script setup>
  import {
    reactive
  } from 'vue'
  const formData = reactive({})
</script>

<style>
</style>
