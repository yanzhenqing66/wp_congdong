<template>
  <com-stu-layout headShow>
    <view slot='head'>
      <button size="mini" class='login_btn' @click="goLogin" v-if="!user.id">免费体验</button>
    </view>
    <view class="train">
      <view class="train_methods">
        <uni-segmented-control :current="trainMCur" :values="trainMethods" @clickItem="handleTrainMethodsChange"
          styleType="button" activeColor="#fff">
        </uni-segmented-control>
      </view>
      <view class="content">
        <view v-show="trainMCur === 0">
          <TrainHw />
        </view>
        <view v-show="trainMCur === 1">
          <view class="uni-mt-15 subCourse">
            <com-button type="primary" width='184rpx' height='51rpx' className='uni-radius-pill'
              @click='handleSubCourse'>我想约课</com-button>
          </view>
          <PrivateTeach />
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
  
  const user = uni.getStorageSync('user')
  
  const trainMethods = reactive(['作业', '私教'])
  const trainMCur = ref(0)

  const handleTrainMethodsChange = (e) => {
    trainMCur.value = e.currentIndex
  }

  const handleDate = (val) => {
    curDate.value = val
  }

  const handleSubCourse = () => {
    uni.navigateTo({
      url: '/pages/student/pre-course/index'
    })
  }
  
  const goLogin = () => {
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }
</script>

<style scoped lang="scss">
  .login_btn {
    width: 250rpx;
    // margin-top: 30rpx;
    margin-left: 40rpx;
    border-radius: 30px;
    background-color: $uni-color-warning;
    color: #fff;
  }
  
  .train {
    width: 675rpx;
    margin: 0 auto;

    .content {
      padding-bottom: 30rpx;
    }

    .subCourse {
      display: flex;
      justify-content: flex-end;
    }

    &_methods {
      ::v-deep.segmented-control__item--button--active {
        .segmented-control__text {
          color: $uni-color-primary !important;
        }
      }
    }
  }
</style>
