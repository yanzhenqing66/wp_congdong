<template>
  <image :src="src" :style="style" :class="['base', className]" :lazy-load='lazy'></image>
</template>

<script setup>
  import {
    reactive
  } from 'vue'
  const props = defineProps({
    src: String,
    width: String,
    height: String,
    lazy: {
      type: Boolean,
      default: false
    },
    className: String,
    styleName: Object
  })

  const style = reactive({
    width: props.width,
    height: props.height,
    // borderRadius: props.radius,
    ...props.styleName
  })
</script>

<style scoped lang="scss">
  .base {
    background: url('~@/static/images/no_num.png') no-repeat;
    background-position: center;
    background-size: 70%;
    background-color: $uni-bg-color-grey;
  }
</style>
