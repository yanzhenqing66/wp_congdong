<template>
  <view class="container">
    <com-userhead></com-userhead>
    <view class="stu">
      <view class="stu_handle">
        <com-button size='mini' type='warning' className="uni-radius-pill" @click="handlePublish">发布作业</com-button>
        <com-button type="primary" className="uni-radius-pill uni-ml-12" size="mini">查看问卷</com-button>
      </view>
    </view>
  </view>
</template>

<script setup>
  const handlePublish = () => {
    uni.navigateTo({
      url: '/pages/teach/publish-hw/index',
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
