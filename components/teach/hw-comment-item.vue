<template>
  <view class="hwCItem" v-for="item in homeworkVideoRecordList" :key="item.id">
    <view class="hwCItem_no">
      <text class="blod">NO.{{item.id}}</text>
      <text class="uni-mx-10">|</text>
      <text>作业目标: <text class="blod">{{item.content}}</text></text>
    </view>
    <video :src="item.videoUrl" class="hwCItem_video"></video>
    <view class="hwCItem_upload-time uni-mt-5">上传时间：{{uploadTime(item.createTime)}}</view>
    <view class="hwCItem_teach-comment uni-primary">教练点评</view>
    <view class="border-line uni-my-10"></view>
    <view class="hwCItem_handle">
      <view class="inline" v-if="!item.score">
        <uni-number-box :min="1" :max="10" v-model="score" />
        <text class="hwCItem_handle_mark">分</text>
      </view>
      <view class="inline" v-else>
        <text class="uni-ml-4">{{item.score}}分</text>
      </view>
      <com-button v-if="!item.score" size='mini' type='warning' className='uni-radius-pill'
        @click="handleRwScore(item.id)">评分
      </com-button>
      <com-button size='mini' type='primary' className='uni-radius-pill' @click='handleComment(item.id)'>在线点评
      </com-button>
    </view>
    <view class="hwCItem_comment" v-show="commentFlag[item.id]">
      <view class="uni-mb-15">
        <text>评论内容: </text>
        <text class="hwCItem_comment_content">{{item.comments[0]}}</text>
      </view>
      <view class="flex-align-center" v-if="!item.comments[0]">
        <uni-easyinput v-model="comment[item.id]" placeholder="请输入评论内容..."></uni-easyinput>
        <com-button type='warning' class='uni-ml-5' @click='handlePubComment(item)'>发布
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
    reviewScore,
    reviewComment
  } from '@/api/path/teach.js'
  import {
    formatDate
  } from '@/libs/day.js'

  const props = defineProps({
    id: String,
    studentId: String,
    homeworkVideoRecordList: Array
  })

  const user = uni.getStorageSync('user')
  const comment = ref({})
  const commentFlag = ref({})
  const score = ref(1)

  const handleRwScore = (id) => {
    reviewScore({
      id: id,
      score: score.value
    }).then(res => {
      props.homeworkVideoRecordList.map(item => {
        if (item.id === id) {
          item.score = score.value
        }
        return
      })
    })
  }

  const handleComment = (id) => {
    if (commentFlag.value[id]) {
      commentFlag.value[id] = false
      return
    }
    commentFlag.value[id] = true
  }

  const handlePubComment = (data) => {
    const params = {
      userId: user.id,
      comment: comment.value[data.id],
      homeworkVideoRecordId: data.id,
      homeworkStudentDetailId: data.homeworkStudentDetailId
    }
    reviewComment(params).then(res => {
      console.log(res);
    })
  }

  const uploadTime = (date) => {
    if (!date) return
    const {
      year,
      formatMM,
      formatDD,
      hour,
      minute
    } = formatDate(date)

    return year + '/' + formatMM + '/' + formatDD + ' ' + hour + ':' + minute
  }
</script>

<style scoped lang="scss">
  .hwCItem {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20rpx 15rpx 30rpx;
    margin-bottom: 60rpx;

    &_no {
      position: absolute;
      top: -29rpx;
      left: -11rpx;

      width: 100%;
      height: 61rpx;
      background: url('~@/static/images/teach/goal-bg.png') no-repeat;
      background-size: cover;
      font-size: $uni-font-size-sm;
      color: #fff;
      padding: 10rpx 12rpx 0;
      display: flex;
    }

    &_video {
      margin-top: 20rpx;
      width: 100%;
      height: 300rpx;
    }

    &_upload-time {
      text-align: right;
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
    }

    &_handle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_mark {
        padding: 5rpx;
        background-color: $uni-color-primary;
        color: #fff;
      }
    }

    &_comment {
      padding: 30rpx;
      width: 100%;
      background-color: $uni-bg-color-grey;
      margin-top: 20rpx;

      &_content {
        background-color: $uni-warning;
        padding: 3rpx;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
</style>
