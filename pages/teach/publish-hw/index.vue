<template>
  <view class="container">
    <view class="publish">
      <UserHead :data='stuDetail' />
      <view class="publish_edit">编辑作业信息</view>
      <view class="publish_calendar">
        <uni-calendar v-model="form.homeworkDate" :date="formatDate(initDate || Date.now()).fullDate"
          :start-date="formatDate(Date.now()).fullDate" :insert="true" range :showMonth="false"
          @change="handleDateChange" />
      </view>
      <view class="publish_select">
        <uni-data-select v-model="form.homeworkTemplateId" :localdata="trainGoalList" @change="handleTrainChange"
          placeholder="作业目标">
        </uni-data-select>
        <view class="seat"></view>
        <uni-easyinput trim="all" v-model="form.content" placeholder="动作要点" @change="actionChange"></uni-easyinput>
        <view class="seat"></view>
        <view v-if="tempDetailList.length">
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
        </view>
        <com-button v-show='form.homeworkTemplateId' type='primary' @click='addHwContent'>+ 继续添加作业内容</com-button>
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
  } from '@dcloudio/uni-app'
  import {
    formatDate
  } from '@/libs/day.js'
  import {
    fetchStuDetail,
    fetchHwTemp,
    fetchHwTempDetail,
    fetchPubHw,
    fetchHwDetal
  } from '@/api/path/teach.js'
  import UserHead from '@/components/teach/user-head'
  import TempList from './temp-list'

  const user = uni.getStorageSync('user')
  const trainGoalList = reactive([]) // 作业目标选项
  const initDetail = ref({})

  const form = reactive({
    homeworkDate: null, // 日期
    homeworkTemplateId: '', // 作业目标
    content: '', // 动作要点
    studentId: ''
  })
  const tempDetailList = ref([]) // 模版视频详情

  const type = ref('')
  const stuDetail = ref({})
  const tempPopup = ref()
  const initDate = ref(null)
  const startDate = computed(() => formatDate(Date.now()).fullDate)

  onLoad((option) => {
    // console.log(option);
    type.value = option.type
    form.studentId = option.studentId
  })

  onMounted(() => {
    getStuDetail()
    getHwTemp()
    if (type.value === '2') {
      init()
    }
  })

  const init = () => {
    const params = {
      teacherId: user.id,
      studentId: form.studentId
    }
    fetchHwDetal(params).then(res => {
      const data = res.data[0]
      initDate.value = data.homeworkDate
      form.homeworkTemplateId = data.homeworkTemplateId
      form.content = data.content
      tempDetailList.value = data.homeworkDetailVos
    })
  }

  const getStuDetail = () => {
    const params = {
      studentId: form.studentId,
      teacherId: user.id
    }
    fetchStuDetail(params).then(res => {
      stuDetail.value = res.data
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
    form.homeworkTemplateId = val
    const content = trainGoalList.find(item => item.value === val).content
    form.content = content
    getTempDetail(val)
  }

  const actionChange = val => {
    form.content = val
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
    form.homeworkDate = val
  }

  const handlePubHw = () => {
    if (!tempDetailList.value.length) return
    const hwTempIds = tempDetailList.value.map(item => item.id)

    let homeworkDate
    if (form.homeworkDate) {
      const range = form.homeworkDate.range.data
      const fulldate = form.homeworkDate.fulldate
      if (range.length > 1) {
        homeworkDate = range.map(item => {
          return new Date(item.replace(/-/g, '/')).getTime()
        })
      } else {
        homeworkDate = new Date(fulldate.replace(/-/g, '/')).getTime()
      }
    } else {
      homeworkDate = new Date(startDate.value.replace(/-/g, '/')).getTime()
    }

    let homeworks

    if (typeof homeworkDate === 'number') {
      homeworks = [{
        studentId: form.studentId,
        homeworkDate: homeworkDate,
        homeworkTemplateId: form.homeworkTemplateId,
        content: form.content,
        homeworkDetailTemplateId: hwTempIds
      }]
    } else {
      homeworks = homeworkDate.map(item => ({
        studentId: form.studentId,
        homeworkDate: item,
        homeworkTemplateId: form.homeworkTemplateId,
        content: form.content,
        homeworkDetailTemplateId: hwTempIds
      }))
    }

    // if(range)
    const params = {
      teacherId: user.id,
      homeworks
    }

    fetchPubHw(params).then(res => {
      if (res.code === 100000) {
        uni.showToast({
          title: '发布成功'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      } else {
        uni.showToast({
          title: '发布失败,请重试'
        })
      }
    })
  }

  const handleReset = () => {
    form.homeworkDate = null
    form.homeworkTemplateId = ''
    form.content = ''
    tempDetailList.value = []
  }
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
