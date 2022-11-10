<template>
  <view class="train_submit uni-my-12">
    <uni-segmented-control :current="isSubmitCur" :values="isSubmitList" @clickItem="handleIsSubmitChange"
      styleType="text" activeColor="#fff"></uni-segmented-control>
  </view>
  <uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="date"
    @change="handleDateChange" />
  <view class="uni-my-12">
    <com-cur-date color='#fff' :curDate='curDate' />
  </view>
  <view class="tHw" v-for="item in trainHwList" :key="item.id">
    <com-head-goal>作业目标: <text class="blod">{{item.homeworkTitle}}</text></com-head-goal>
    <view class="tHw_content uni-px-15 uni-pb-15">
      <view class="content">
        <text class="content_title">动作内容: </text>
        <text class="content_name">{{item.content}}</text>
      </view>
      <view class="border-line uni-my-10"></view>
      <view class="content">
        <text class="content_title">动作要点: </text>
        <text class="content_name">{{item.homeworkContent}}</text>
      </view>
      <view class="border-line uni-my-10"></view>
      <view class="tHw_info flex flex-bewteen">
        <text class="bold" v-if="isSubmitCur === 0">完成组数：<text
            class="tHw_info_num uni-primary">{{item.sets}}</text></text>
        <text class="bold" v-else>获得学分：<text class="tHw_info_num uni-primary">{{item.score}}</text></text>
        <text class="tHw_info_publish-date">布置时间：
          {{formatDate(item.createTime).year+'/'+formatDate(item.createTime).formatMM + '/' + formatDate(item.createTime).formatDD}}</text>
      </view>
      <view class="border-line uni-my-10"></view>
      <view class="flex-center">
        <com-button v-if="isSubmitCur === 0" type='primary' size='mini' width='362rpx' height='51rpx'
          className='uni-radius-pill' @click='handlePublishHw(item)'>提交视频作业
        </com-button>
        <com-button v-else type='primary' size='mini' width='362rpx' height='51rpx' className='uni-radius-pill'
          @click='handlePublishHw(item)'>查看点评
        </com-button>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    fetchStuHwList
  } from '@/api/path/student.js'
  import {
    formatDate,
    getCurDay
  } from '@/libs/day.js'

  const user = uni.getStorageSync('user')

  const trainHwList = ref([])
  const isSubmitList = ['未提交', '已提交']
  const isSubmitCur = ref(0)
  const date = ref(getCurDay())

  const handleDateChange = (val) => {
    date.value = val
    getStuHwList()
  }

  const handleIsSubmitChange = (e) => {
    isSubmitCur.value = e.currentIndex
    getStuHwList()
  }

  const getStuHwList = () => {
    const params = {
      studentId: user.id,
      submitStatus: isSubmitCur.value === 0 ? 10 : 20,
      date: date.value
    }
    fetchStuHwList(params).then(res => {
      trainHwList.value = res
    })
  }

  onMounted(() => {
    getStuHwList()
  })

  // 提交视频作业 & 查看点评
  const handlePublishHw = (item) => {
    // console.log(item);
    uni.navigateTo({
      url: `/pages/student/train/publish-hw?id=${item.id}`
    })
  }
</script>

<style scoped lang="scss">
  .train_submit {
    ::v-deep.segmented-control__text {
      color: $uni-text-color-inverse !important;
    }
  }

  .tHw {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 50rpx;
    color: $uni-text-color;

    &_content {
      padding-top: 60rpx;
    }

    .content {
      display: flex;
      align-items: baseline;

      &_title {
        font-size: $uni-font-size-lg;
        color: $uni-primary;
        margin-right: 20rpx;
      }

      &_name {
        flex: 1;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }

    &_info {
      // display: flex;
      align-items: flex-end;

      &_num {
        font-size: $uni-font-size-lg;
      }

      &_publish-date {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }
  }
</style>
