<template>
  <uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="date"
    @change="handleDateChange" />
</template>

<script setup>
  const emit = defineEmits(['handleDate'])

  const date = Date.now()

  const handleDateChange = (val) => {
    emit('handleDate', val)
  }
</script>

<style>
</style>
