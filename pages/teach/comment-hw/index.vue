<template>
  <view class="comment">
    <com-title>点评作业</com-title>
    <view class="comment_stu">
      <StuInfo :data='stuDetail' />
      <view class="border-line uni-my-10">
      </view>
      <view>
        <text class="mark">学生学分：32</text>
        <!-- <com-button size='mini' type='warning'>提醒</com-button> -->
      </view>
    </view>
    <view class="comment_content">
      <HwCommentItem />
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad,
  } from '@dcloudio/uni-app'
  import {
    ref,
    onMounted
  } from 'vue'
  import StuInfo from '@/components/teach/stu-info.vue'
  import HwCommentItem from '@/components/teach/hw-comment-item.vue'
  import {
    fetchStuDetail,
    fetchHwDetal
  } from '@/api/path/teach.js'

  const user = uni.getStorageSync('user')
  const studentId = ref()
  const curDate = ref()
  const stuDetail = ref({})
  const hwList = ref([])

  onLoad((options) => {
    studentId.value = options.studentId
    curDate.value = options.date
  })

  onMounted(() => {
    const params = {
      studentId: studentId.value,
      teacherId: user.id,
      date: curDate.value
    }

    fetchStuDetail(params).then(res => {
      stuDetail.value = res.data
    })

    fetchHwDetal(params).then(res => {
      hwList.value = res.data
    })
  })
</script>

<style lang="scss" scoped>
  .comment {
    width: 100%;
    min-height: 100%;
    padding: 38rpx 38rpx 0;
    background-color: $uni-bg-color-grey;

    &_stu {
      padding: 20rpx 35rpx;
      background-color: #fff;
    }

    .mark {
      color: $uni-color-primary;
    }

    &_content {
      margin-top: 60rpx;
    }
  }
</style>
