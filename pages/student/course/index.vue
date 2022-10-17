<template>
  <com-stu-layout headShow>
    <view class="flex-center">
      <view class="course-content">
        <image src='/static/images/course-err.png' class="course-err"></image>
        <view class="soon">coming soon...</view>
        <view class="soon">网页正在建设中</view>
      </view>
    </view>
  </com-stu-layout>
</template>

<script>
</script>

<style scoped lang="scss">
  .course-content {
    padding-top: 25vh;
    text-align: center;
    line-height: 26px;
  }

  .course-err {
    width: 121rpx;
    height: 111rpx;
  }

  .soon {
    font-size: 28rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
</style>
