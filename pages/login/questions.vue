<template>
  <com-stu-layout headShow>
    <view class="questions class='uni-pa-20">
      <view class="flex-col">
        <view>为了更有针对性的进行训练，请您如实回答以下问题</view>
        <view class="border-line uni-my-20"></view>
        <uni-forms :modelValue="formData" ref='form'>
          <view>
            <view class='uni-mb-10'>
              <uni-icons type="smallcircle-filled" color="#fff" size="12"></uni-icons>
              <text class="uni-ml-4">{{questions[0].question}}</text>
            </view>
            <uni-forms-item v-for="item in questions[0].answers" :key="item.id">
              <view>
                <view>{{item.answer}}</view>
                <uni-data-checkbox v-model="formData.gold[item.id]" :localdata="item.answers" multiple :max='2' style="color: #fff">
                </uni-data-checkbox>
              </view>
            </uni-forms-item>
          </view>

          <uni-forms-item name="expect">
            <slot name="label">
              <view class='uni-mb-10'>
                <uni-icons type="smallcircle-filled" color="#fff" size="12"></uni-icons>
                <text class="uni-ml-4">{{questions[1].question}}</text>
              </view>
            </slot>
            <uni-data-checkbox v-model="formData.expect" :localdata="questions[1].answers">
            </uni-data-checkbox>
          </uni-forms-item>
          
          <view>
            <view class='uni-mb-10'>
              <uni-icons type="smallcircle-filled" color="#fff" size="12"></uni-icons>
              <text class="uni-ml-4">{{questions[2].question}}</text>
            </view>
            <uni-forms-item v-for="item in questions[2].answers" :key="item.id">
              <view>
                <view>{{item.answer}}</view>
                <uni-data-checkbox v-model="formData.increase[item.id]" :localdata="item.answers" multiple>
                </uni-data-checkbox>
              </view>
            </uni-forms-item>
          </view>
        </uni-forms>
        <view class="flex-center uni-py-20">
          <com-button type='warning' @click="submitForm" width='400rpx' height='70rpx' className='uni-radius-pill'>提交答案
          </com-button>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    reactive,
    ref,
    onMounted
  } from 'vue'
  import {
    fetchQuestions,
    submitQuestion
  } from '@/api/path/student.js'

  const user = uni.getStorageSync('user')
  const questions = ref([])
  const goldEnum = ref([])

  const formData = reactive({
    gold: {},
    expect: '',
    increase: {}
  })

  const form = ref(null)

  onMounted(() => {
    fetchQuestions().then(res => {
      questions.value = res.questions.map(item => {
        if (item.answers) {
          item.answers = item.answers.map(item2 => {
            item2.text = item2.answer
            item2.value = item2.id
            if (item2.answers) {
              item2.children = item2.answers.map(item3 => {
                item3.text = item3.answer
                item3.value = item3.id
                return item3
              })
            }
            return item2
          })
          return item
        } else {
          return item
        }
      })
    })
  })

  const submitForm = () => {
    form.value.validate().then(res => {
      const tempList = []
      Object.keys(formData.gold).forEach(key => {
        tempList.push(...formData.gold[key])
      })
      Object.keys(formData.increase).forEach(key => {
        tempList.push(...formData.increase[key])
      })
      const ids = tempList.toString() + ',' + res.expect

      submitQuestion({
        studentId: user.id,
        answerIds: ids,
      }).then(res => {
        uni.showToast({
          title: `校验通过`
        })
        uni.navigateTo({
          url: '/pages/login/submit-questions'
        })
      })
    })
  }
</script>

<style lang="scss" scoped>
  .questions {
    height: 100%;

    ::v-deep.checklist-text {
      // background-color: #fff;
      color: #fff !important;
    }
  }
</style>
