<template>
  <view class="container">
    <UserHead :data='data' />
    <view class="stu">
      <view class="stu_handle" v-if="data.publishStatus === 10">
        <com-button size='mini' type='warning' className="uni-radius-pill" @click="handlePublish(data.studentId, '1')">
          发布作业
        </com-button>
        <com-button type="primary" className="uni-radius-pill uni-ml-12" size="mini">查看问卷</com-button>
      </view>
      <view class="stu_handle" v-if="data.publishStatus === 20">
        <com-button size='mini' type='warning' className="uni-radius-pill" @click="handlePublish(data.studentId, '2')">
          重新编辑
        </com-button>
        <com-button type="primary" className="uni-radius-pill uni-ml-12" size="mini"
          :disabled="data.commentStatus === 20" @click='commentHw(data.studentId, data.startTime)'>点评作业</com-button>
      </view>
    </view>
  </view>
</template>

<!-- submitStatus: 10 发布作业 20 修改作业 -->
<!-- commentStatus: 10 点评作业 20 点评过 -->

<script setup>
  import {
    onMounted
  } from 'vue'
  import UserHead from '@/components/teach/user-head'

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    },
  })

  const handlePublish = (studentId, type) => {
    uni.navigateTo({
      url: `/pages/teach/publish-hw/index?studentId=${studentId}&type=${type}`,
    })
  }

  const commentHw = (studentId, date) => {
    uni.navigateTo({
      url: `/pages/teach/comment-hw/index?studentId=${studentId}&date=${date}`,
    })
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    margin-top: 40rpx;
  }

  .stu {
    position: relative;
    width: 100%;
    // height: 280rpx;
    background-color: #fff;
    padding: 0 30rpx;

    &_handle {
      padding: 27rpx 0 30rpx 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
