<template>
  <com-stu-layout headShow>
    <view class="questions flex-center">
      <view class="flex-col">
        <view>为了更有针对性的进行训练，请您如实回答以下问题</view>
        <view class="border-line uni-my-20"></view>
        <uni-forms :modelValue="formData" ref='form'>
          <uni-forms-item name="name">
            <slot name="label">
              <view class='uni-mb-10'>
                <uni-icons type="smallcircle-filled" color="#fff" size="12"></uni-icons>
                <text class="uni-ml-4">调查问卷问题</text>
              </view>
            </slot>
            <uni-data-select v-model="formData.name"></uni-data-select>
          </uni-forms-item>
        </uni-forms>
        <view class="flex-center">
          <com-button type='warning' @click="submitForm" size='large' width='450rpx' height='90rpx'
            className='uni-radius-pill'>提交答案
          </com-button>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    reactive,
    ref
  } from 'vue'

  const formData = reactive({
    name: ''
  })

  const form = ref(null)

  const submitForm = () => {
    form.value.validate().then(res => {
      uni.navigateTo({
        url: '/pages/login/submit-questions'
      })
      uni.showToast({
        title: `校验通过`
      })
    })
  }
</script>

<style lang="scss" scoped>
  .questions {
    height: 100%;
  }
</style>
