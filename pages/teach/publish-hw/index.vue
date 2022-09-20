<template>
  <view class="container">
    <view class="publish">
      <!-- <UserHead :data='stuDetail.data' /> -->
      <view class="publish_edit">编辑作业信息</view>
      <view class="publish_calendar">
        <uni-calendar v-model="form.hwDate" :start-date="startDate" :insert="true" range :showMonth="false"
          @change="handleDateChange" />
      </view>
      <view class="publish_select">
        <uni-data-select v-model="form.train" :localdata="trainGoalList" @change="handleTrainChange" placeholder="作业目标">
        </uni-data-select>
        <view class="seat"></view>
        <uni-easyinput trim="all" v-model="form.actionPoint" placeholder="动作要点" disabled></uni-easyinput>
        <view class="seat"></view>
        <view class="publish_select_content uni-mb-8" v-for="item in tempDetailList" :key="item.id">
          <view class="title uni-primary-bg flex-center max-1-line">
            <uni-icons type="closeempty" color="#fff" size="22rpx" class="uni-mt-1 uni-mr-1"
              @click="delHwVideo(item.id)"></uni-icons>
            <text>{{item.content}}</text>
          </view>
          <view class="video uni-warning-bg uni-mx-4 flex-center">
            <uni-icons type="videocam" color="#fff" size="25rpx" class="uni-mt-1"></uni-icons>
            <text>动作示范视频</text>
          </view>
          <view class="amount">
            <uni-number-box v-model='item.sets' :min="1" :max="100" @change='v => amountChange(item.id, v)' />
            <text class="amount_unit uni-primary-bg flex-center">组</text>
          </view>
        </view>
        <com-button v-show='form.train' type='primary' @click='addHwContent'>+ 继续添加作业内容</com-button>
        <view class="border-line uni-my-14"></view>
        <view class="publish_select_btn">
          <com-button type="primary" size="mini" width="235rpx" height="67rpx" @click="handleReset">重置内容</com-button>
          <com-button size="mini" type="warning" width="235rpx" height="67rpx" @click="handlePubHw">
            确认发布
          </com-button>
        </view>
      </view>
    </view>
    <temp-list ref='tempPopup' @updTempDetal='updTempDetal' />
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed,
    onMounted
  } from 'vue'
  import {
    onLoad,
    onShow
  } from '@dcloudio/uni-app'
  import {
    formatDate
  } from '@/libs/day.js'
  import {
    fetchStuDetail,
    fetchHwTemp,
    fetchHwTempDetail,
    fetchPubHw
  } from '@/api/path/teach.js'
  import UserHead from '@/components/teach/user-head'
  import TempList from './temp-list'

  const trainGoalList = reactive([])

  const form = reactive({
    hwDate: [],
    train: '',
    actionPoint: '',
    studentId: ''
  })

  console.log(form.hwDate);

  const stuDetail = reactive({
    data: {}
  })

  const tempDetailList = ref([])

  const tempPopup = ref()

  const startDate = computed(() => {
    return formatDate(Date.now()).fullDate
  })

  onLoad((option) => {
    form.studentId = option.studentId
  })

  onMounted(() => {
    getStuDetail()
    getHwTemp()
  })

  const getStuDetail = () => {
    fetchStuDetail(form.studentId).then(res => {
      stuDetail.data = res.data
    })
  }

  const getHwTemp = () => {
    fetchHwTemp().then((res) => {
      const list = res.map((item) => {
        item.value = item.id
        item.text = item.title
        return item
      })
      trainGoalList.push(...list)
    })
  }

  const getTempDetail = (id) => {
    fetchHwTempDetail(id).then(res => {
      tempDetailList.value = res
    })
  }

  const handleTrainChange = (val) => {
    form.train = val
    const content = trainGoalList.find(item => item.value === val).content
    form.actionPoint = content
    getTempDetail(val)
  }

  const updTempDetal = (data) => {
    tempDetailList.value.push(data)
  }

  const delHwVideo = (id) => {
    const copyTempList = tempDetailList.value
    const arr = copyTempList.filter(item => item.id !== id)
    tempDetailList.value = arr
  }

  const amountChange = (id, v) => {
    const tempCopy = tempDetailList.value
    const newTemp = tempCopy.map(item => {
      if (item.id === id) {
        item.sets = v
      }
      return item
    })
    tempDetailList.value = newTemp
  }

  const addHwContent = () => {
    tempPopup.value.open(tempDetailList.value)
  }

  const handleDateChange = (val) => {
    form.hwDate = val
    console.log(form.hwDate)
  }

  const handlePubHw = () => {
    const hwTempIds = tempDetailList.map(item => item.id)
    const params = {
      teacherId: uni.getStorageSync('user')?.id
      homeworks: [{
        studentId: form.studentId,
        homeworkDate: 1663590582,
        homeworkTemplateId: form.train,
        homeworkDetailTemplateId: hwTempIds
      }]
    }
    // fetchPubHw().then(res => {
    //   console.log(res);
    // })
  }

  const handleReset = () => {}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100vh;
    background-color: $uni-bg-color-grey;
    padding: 30rpx;
  }

  .publish {
    width: 100%;
    background-color: #fff;

    &_edit {
      margin-top: 24rpx;
      width: 100%;
      height: 49rpx;
      background-color: #ffa932;
      color: #fff;
      line-height: 49rpx;
      text-align: center;
    }

    &_calendar {
      width: 100%;

      ::v-deep.uni-calendar-item__weeks-box-item {
        width: 70rpx;
        height: 80rpx;
      }

      ::v-deep.uni-calendar-item__weeks-lunar-text {
        display: none;
      }
    }

    &_select {
      padding: 29rpx 38rpx;

      &_btn {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .publish_select_content {
    height: 26px;
    font-size: $uni-font-size-sm;
    display: flex;
    color: #fff;

    .title {
      width: 200rpx;
    }

    .video {
      width: 180rpx;
    }

    .amount {
      flex: 1;
      @extend %flexCenter;

      &_unit {
        width: 40rpx;
        height: 100%;
      }
    }
  }

  .publish_select_add {
    width: 100%;
    padding: 15rpx 0;
    background-color: $uni-color-primary;
    text-align: center;
    font-size: $uni-font-size-sm;
    color: #fff;
    border-radius: 4px;
  }

  .seat {
    height: 18rpx;
  }
</style>
