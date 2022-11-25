<template>
  <uni-popup ref="popup" type="bottom">
    <view class="stu_list">
      <view>请选择学生</view>
      <view class="uni-mt-20">
        <uni-data-checkbox mode="list" icon="right" v-model="inputData" :localdata="allStu" multiple @change="handleChange"></uni-data-checkbox>
      </view>
      <view class="btn">
        <com-button type='primary' @click="enterSel">确认选择</com-button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
  import { ref, onMounted, toRef, toRefs } from 'vue'
  
  const emits = defineEmits(['update:modelValue'])
  
  const props = defineProps({
    modelValue: Array
  })
  
  const popup = ref()
  const allStu = ref([])
  const inputData = ref(props.modelValue)
  
  const open = (val) => {
    allStu.value = val.map(item => {
      item.value = item.id
      item.text = item.nikeName
      return item
    })
    popup.value.open()
  }
  
  const handleChange = (e) => {
    emits('update:modelValue', e.detail.value)
  }
  
  const enterSel = () => {
    popup.value.close()
  }
  
  defineExpose({
    open
  })
  
</script>

<style scoped lang="scss">
  .stu_list {
    background-color: #fff;
    min-height: 65vh;
    max-height: 70vh;
    overflow-y: auto;
    padding: 30rpx;
    
    .btn {
      padding: 20rpx;
      position: sticky;
      bottom: 0;
    }
  }
</style>