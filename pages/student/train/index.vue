<template>
  <com-stu-layout headShow>
    <view class="train" scroll-y="true">
      <view class="train_methods">
        <uni-segmented-control :current="trainMCur" :values="trainMethods" @clickItem="handleTrainMethodsChange"
          styleType="button" activeColor="#fff">
        </uni-segmented-control>
      </view>
      <view v-show="trainMCur === 0">
        <view class="train_submit uni-mt-12">
          <uni-segmented-control :current="isSubmitCur" :values="isSubmitList" @clickItem="handleIsSubmitChange"
            styleType="text"></uni-segmented-control>
        </view>
        <view class="uni-mt-12">
          <com-date-picker @handleDate='handleDate' />
        </view>
      </view>
      <view class="uni-my-12">
        <com-cur-date color='#fff' :curDate='curDate' />
      </view>
      <view class="content">
        <view v-show="trainMCur === 0">
          <template v-for="i in 10" :key="i">
            <TrainHw />
          </template>
        </view>
        <view v-show="trainMCur === 1">
          <template v-for="i in 10" :key="i">
            <PrivateTeach />
          </template>
        </view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import TrainHw from './components/train-hw.vue'
  import PrivateTeach from './components/private-teach.vue'
  import {
    ref,
    reactive
  } from 'vue'
  const trainMethods = reactive(['作业', '私教'])
  const isSubmitList = reactive(['未提交', '已提交'])
  const trainMCur = ref(0)
  const isSubmitCur = ref(0)
  const curDate = ref()

  const handleTrainMethodsChange = (e) => {
    trainMCur.value = e.currentIndex
  }
  const handleIsSubmitChange = (e) => {
    if (!e?.currentIndex) return
    isSubmitCur.value = e.currentIndex
  }

  const handleDate = (val) => {
    curDate.value = val
  }
</script>

<style scoped lang="scss">
  .train {
    width: 675rpx;
    margin: 0 auto;

    .content {
      padding-bottom: 30rpx;
    }


    &_methods {
      ::v-deep.segmented-control__item--button--active {
        .segmented-control__text {
          color: $uni-color-primary !important;
        }
      }
    }

    &_submit {
      ::v-deep.segmented-control__text {
        color: $uni-text-color-inverse !important;
      }
    }
  }
</style>
