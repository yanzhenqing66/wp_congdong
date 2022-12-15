<template>
  <com-stu-layout headShow>
    <view class="pub-hw-box" v-if="data.id">
      <view class="pub-hw uni-px-8">
        <com-head-goal>作业目标: {{data.content}}</com-head-goal>
        <view class="pub-hw_stu-up">
          <video class="video" :src="data.videoUrl" controls></video>
        </view>
        <view class="sub-info">
          <text class="score">获得学分: <text class="uni-primary">{{data.score}}</text></text>
          <text class="date">提交时间：{{formatTime(data.createTime)}}</text>
        </view>
        <view class="comment uni-mt-12" v-if="data.comments[0]">
          <view class="uni-mb-10">老师评论: </view>
          <text class="content">{{data.comments[0]}}</text>
        </view>
      </view>
      <view class="handle_btn">
        <com-button type='warning' className='uni-radius-pill' width='435rpx' height='90rpx' @click='handleReceive'>
          {{options.title}}
        </com-button>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    onLoad,
  } from '@dcloudio/uni-app'
  import {
    reactive,
    onMounted,
    ref
  } from 'vue'
  import {
    fetchShareVideo
  } from '@/api/path/student.js'
  import {
    getUserInfo
  } from '@/api/path/login.js'
  import {
    formatDate
  } from '@/libs/day.js'
  
  const user = uni.getStorageSync('user')

  const options = reactive({
    id: '',
    title: ''
  })

  const data = ref({})

  onLoad((res) => {
    options.id = res.id
  })

  onMounted(() => {
    fetchShareVideo(options.id).then(res => {
      data.value = res
    })
    options.title = user?.id ? (user?.contractType ? '查看我的训练计划' : '马上加入训练营') : '免费领取训练课程'
  })

  const handleReceive = () => {
    const token = uni.getStorageSync('token')
    const user = uni.getStorageSync('user')

    if (token && user.id) {
      getUserInfo().then(res => {
        uni.setStorageSync('user', res.data)
        if (res.data.userType === 2) {
          uni.reLaunch({
            url: '/pages/teach/student/index'
          })
        } else if (res.data.userType === 3) {
          if (res.data.contractType) {
            uni.reLaunch({
              url: '/pages/student/home/index'
            })
          } else {
            uni.reLaunch({
              url: '/pages/login/questions'
            })
          }
        }
      })
    } else {
      uni.reLaunch({
        url: '/pages/login/index'
      })
    }
  }

  const formatTime = (date) => {
    if (!date) return ''
    return formatDate(date).year + '/' + formatDate(date).formatMM + '/' + formatDate(date).formatDD + ' ' +
      formatDate(date).hour + ':' + formatDate(date).minute
  }
</script>

<style lang="scss" scoped>
  .pub-hw-box {
    width: 675rpx;
    margin: 0 auto;
    padding-top: 30rpx;
    color: #333;
  }

  .pub-hw {
    position: relative;
    width: 100%;
    margin-top: 40rpx;
    background-color: #fff;
    padding-top: 60rpx;
    padding-bottom: 20rpx;

    &_stu-up {
      .video {
        width: 100%;
        height: 300rpx;
        background-color: $uni-bg-color-grey;
      }

      .upload {
        width: 100%;
        height: 300rpx;
        text-align: center;

        &_text {
          font-size: $uni-font-size-sm;
        }
      }
    }
  }

  .sub-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $uni-font-size-sm;

    .score {
      font-size: $uni-font-size-base;
    }

    .date {
      color: $uni-text-color-grey;
    }
  }

  .comment {
    background-color: #f6f6f6;
    padding: 20rpx;
    border-radius: 4px;

    .content {
      background-color: $uni-primary;
      padding: 3rpx 5rpx;
      color: #fff;
      border-radius: 4px;
    }
  }

  .handle_btn {
    margin-top: 120rpx;
    display: flex;
    justify-content: center;
  }
</style>
