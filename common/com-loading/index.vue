<template>
  <refresh>
    <uni-icons type="spinner-cycle" size="30" color="#fff" class='loading'></uni-icons>
    <loading-indicator></loading-indicator>
  </refresh>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .uniui-spinner-cycle:before {
    position: relative;
    transform-style: preserve-3d;
    animation: move 5s infinite;
  }

  @keyframes move {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
</style>
