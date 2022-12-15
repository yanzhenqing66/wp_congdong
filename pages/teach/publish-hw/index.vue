<template>
  <view class="container">
    <view class="publish">
      <UserHead :data='stuDetail' v-if="type !== '3'" />
      <view class="publish_edit">编辑作业信息</view>
      <view class="publish_calendar">
        <uni-calendar v-model="form.homeworkDate" :date="formatDate(initDate)?.fullDate"
           :insert="true" range :showMonth="false"
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
            <view class="video uni-warning-bg uni-mx-4 flex-center" @click="handleOpenVidoe(item.videoUrl)">
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
        <com-button v-if="type === '3'" className='uni-mt-10' type='primary' @click='handleSelStu'>选择学员</com-button>
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
    <stu-all-list ref="stuPopup" v-model="form.selStu"></stu-all-list>
    <video-modal ref="videoPopup"></video-modal>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed,
    onMounted,
    watch
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
    fetchHwDetal,
    updateHw,
    fetchAllStuList
  } from '@/api/path/teach.js'
  import UserHead from '@/components/teach/user-head'
  import TempList from './temp-list'
  import StuAllList from './stuAllList'
  import VideoModal from './videoModal.vue'

  const user = uni.getStorageSync('user')
  const trainGoalList = reactive([]) // 作业目标选项
  const initDetail = ref({})

  const form = reactive({
    homeworkDate: null, // 日期
    homeworkTemplateId: '', // 作业目标
    content: '', // 动作要点
    studentId: '',
    oldHomeworkId: '',
    selStu: []
  })
  const tempDetailList = ref([]) // 模版视频详情

  const type = ref('')
  const stuDetail = ref({})
  const tempPopup = ref()
  const stuPopup = ref()
  const videoPopup = ref()
  
  const initDate = ref(null)
  const initAllStu = ref([])
  
  onLoad((option) => {
    // console.log(option);
    type.value = option.type
    if(option.studentId) {
      form.studentId = option.studentId
    }
    if(option.date) {
      initDate.value = Number(option.date)
    }
  })
  
  onMounted(() => {
    if(type.value !== '3') {
      getStuDetail()
    }
    getHwTemp()
    if (type.value === '2') {
      init()
    }
    if(type.value === '3') {
      getAllStu()
    }
  })
  
  watch(() => form.homeworkDate, () => {
    if (type.value === '2') {
      init()
    }
    if(type.value === '3') {
      getAllStu()
    }
  })

  const init = () => {
    const time = form.homeworkDate?.range?.before?.replace(/-/g, '/') || form.homeworkDate?.fulldate?.replace(/-/g, '/') || initDate.value
    const params = {
      teacherId: user.id,
      studentId: form.studentId,
      date: new Date(time).getTime()
    }
    fetchHwDetal(params).then(res => {
      const data = res.data[0]
      form.homeworkTemplateId = data.homeworkTemplateId
      form.content = data.content
      tempDetailList.value = data.homeworkDetailVos
      form.oldHomeworkId = data.id
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
  
  // 打开视频
  const handleOpenVidoe = (videoUrl) => {
    videoPopup.value.open(videoUrl)
  }

  // 获取所有学生
  const getAllStu = () => {
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
      homeworkDate = new Date(initDate.value).getTime()
    }
    const params = {
      teacherId: user.id,
      dates: homeworkDate.toString()
    }
    fetchAllStuList(params).then(res => {
      initAllStu.value = res
    })
  }
  
  // 选择学员
  const handleSelStu = () => {
    stuPopup.value.open(initAllStu.value)
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
    if (!tempDetailList.value.length) {
      uni.showToast({
        icon:'error',
        title: '请选择作业'
      })
      return
    } 
    if(type.value === '3' && !form.selStu.length) {
      uni.showToast({
        icon:'error',
        title: '请选择学员'
      })
      return
    }
    const hwTempIds = tempDetailList.value.map(item => ({homeworkDetailTemplateId: item.id, sets: item.sets}))

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
      homeworkDate = new Date(initDate.value).getTime()
    }

    let homeworks
    const selStu = form.selStu.map(item => item)

    if (typeof homeworkDate === 'number') {
      if(type.value === '3') {
        homeworks = selStu.map(stu => {
         return {
           studentId: stu,
           homeworkDate: homeworkDate,
           homeworkTemplateId: form.homeworkTemplateId,
           content: form.content,
           homeworkDetails: hwTempIds,
           oldHomeworkId: form.oldHomeworkId ? form.oldHomeworkId : null
         }
        })
      } else {
        homeworks = [{
          studentId: form.studentId,
          homeworkDate: homeworkDate,
          homeworkTemplateId: form.homeworkTemplateId,
          content: form.content,
          homeworkDetails: hwTempIds,
          oldHomeworkId: form.oldHomeworkId ? form.oldHomeworkId : null
        }]
      }
    } else {
      const list = homeworkDate.map(item => {
        if(type.value === '3') {
          return selStu.map(stu => ({
            studentId: stu,
            homeworkDate: item,
            homeworkTemplateId: form.homeworkTemplateId,
            content: form.content,
            homeworkDetails: hwTempIds,
            oldHomeworkId: form.oldHomeworkId ? form.oldHomeworkId : null
          }))
        }else {
          return {
            studentId: form.studentId,
            homeworkDate: item,
            homeworkTemplateId: form.homeworkTemplateId,
            content: form.content,
            homeworkDetails: hwTempIds,
            oldHomeworkId: form.oldHomeworkId ? form.oldHomeworkId : null
          }
        }
      })
      homeworks = list.flat(Infinity)
    }

    // if(range)
    const params = {
      teacherId: user.id,
      homeworks
    }
    
    if(type.value === '2') {
      updateHw(params).then(res => {
        if (res.code === 100000) {
          uni.showToast({
            title: '发布成功'
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          uni.showToast({
            icon:'error',
            title: res.msg
          })
        }
      })
      return
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
          icon:'error',
          title: res.msg
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
