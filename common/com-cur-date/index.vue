<template>
  <view class="cur_date" :style="{color}">
    <uni-icons type="calendar" color="color" size="18"></uni-icons>
    <!-- <image src="/static/images/teach/calendar.png" class="cur_date_calendar"></image> -->
    <text class="search_date uni-mx-10">{{showTime.formatMM}}月{{showTime.formatDD}}日 {{showTime.weekday}}</text>
    <uni-tag v-show="showTime.formatDD === nowDay" text="今天" size="small" type="primary" circle></uni-tag>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue'
  import {
    formatDate
  } from '@/libs/day.js'

  const props = defineProps({
    curDate: {
      type: Number,
      default: Date.now()
    },
    color: {
      type: String,
      default: '#333'
    }
  })

  const nowDay = computed(() => formatDate(Date.now()).formatDD)

  const showTime = computed(() => formatDate(props.curDate))
</script>

<style scoped lang="scss">
  .cur_date {
    display: flex;
    align-items: center;
  }
</style>
