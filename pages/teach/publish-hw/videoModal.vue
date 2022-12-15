<template>
  <uni-popup ref="popup" type="center">
   <view class="video">
      <video :src="videoUrl" class="content" controls="true"></video>
    </view>
  </uni-popup>
</template>

<script setup>
  
  import {
    ref,
  } from 'vue'
  
  const popup = ref()
  const videoUrl = ref('')
  
  const open = (url) => {
    popup.value.open()
    videoUrl.value = url
  }
  
  defineExpose({
    open
  })
</script>

<style lang="scss" scoped>
  .video {
    background-color: #fff;
    
    .content {
      width: 640rpx;
      height: 300rpx;
    }
  }
</style>