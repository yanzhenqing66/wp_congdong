<template>
  <com-stu-layout headShow>
    <view class="form-lay class='uni-pa-19">
      <view>
        <text>为了您更好的体验约课服务，请填准确填写以下信息</text>
      </view>
      <view class="border-line uni-my-12"></view>
      <uni-forms :modelValue="formData" ref="formRef" label-position='top' class='form'>
        <uni-forms-item name="teacherId" label="选择教练" required style='background-color: #fff;'>
          <uni-data-select v-model="formData.teacherId" :localdata="teachList">
          </uni-data-select>
        </uni-forms-item>
        <uni-forms-item name="date" label="约课日前" required>
          <uni-datetime-picker type="date" return-type='timestamp' :clear-icon="false" v-model="formData.date" />
        </uni-forms-item>
        <uni-forms-item name="startTime" label="起始时间" required>
          <uni-datetime-picker type="datetime" return-type='timestamp' :clear-icon="false"
            v-model="formData.startTime" />
        </uni-forms-item>
        <uni-forms-item name="place" label="授课地点" required>
          <uni-easyinput v-model="formData.place"></uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="peopleCount" label="学员人数" required>
          <uni-easyinput v-model="formData.peopleCount" type="number"></uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="omo" label="线上线下" required>
          <uni-data-select :localdata="omoEnum" v-model="formData.omo"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item name="duration" label="课程时长" required>
          <uni-data-select v-model="formData.duration" :localdata="courseDur"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item name="contact" label="联系方式" required>
          <uni-easyinput v-model="formData.contact" type="number"></uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="remark" label="备注信息">
          <uni-easyinput v-model="formData.remark" type="textarea" autoHeight></uni-easyinput>
        </uni-forms-item>
        <view class="flex flex-center">
          <com-button class='uni-mr-20' @click='handleBack'>返回</com-button>
          <com-button type='warning' @click='handleSubmit'>确认提交</com-button>
        </view>
      </uni-forms>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    ref,
    reactive,
    onMounted
  } from 'vue'
  import {
    fetchTeacherEnum,
    fetchOmoEnum,
    fetchCourseDur,
    reserveCourse
  } from '@/api/path/student.js'
  const user = uni.getStorageSync('user')

  const formData = reactive({
    teacherId: '',
    date: '',
    startTime: '',
    place: '',
    peopleCount: '',
    omo: '',
    duration: '',
    contact: '',
    remark: '',
  })

  const teachList = ref([])
  const omoEnum = ref([])
  const courseDur = ref([])

  const formRef = ref()

  const handleSubmit = () => {
    formRef.value.validate().then((res) => {
      reserveCourse({
        ...res,
        studentId: user.id
      }).then(res => {
        console.log(res)
        if (res.code !== 1000000) {
          uni.showToast({
            icon: 'error',
            title: res.msg
          })
        }
      })
    }).catch((err) => {
      uni.showToast({
        icon: 'error',
        title: err.msg
      })
    })
  }

  const handleBack = () => {
    uni.navigateBack()
  }

  onMounted(() => {
    fetchTeacherEnum(user.id).then(res => {
      teachList.value = res.map(item => {
        item.value = item.id
        item.text = item.name
        return item
      })
    })
    fetchOmoEnum().then(res => {
      omoEnum.value = res.map(item => {
        item.value = item.code
        item.text = item.content
        return item
      })
    })
    fetchCourseDur().then(res => {
      courseDur.value = res.map(item => {
        item.value = item.code
        item.text = item.content
        return item
      })
    })
  })
</script>

<style scoped lang="scss">
  .form-lay {
    color: black;

    ::v-deep.uni-select {
      background-color: #fff;
    }
    
    ::v-deep.uni-forms-item__label {
      text:last-child {
        color: #fff;
      }
    }
  }
</style>
