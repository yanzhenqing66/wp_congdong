<template>
  <button :size='size' :class="[
    {'primary': type === 'primary',
    'warning': type === 'warning'},
    'base',
    className
  ]" @click='click'>
    <slot></slot>
  </button>
</template>

<script setup>
  const props = defineProps({
    size: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'default'
    },
    className: String,
  })

  const emit = defineEmits(['click'])

  const click = () => {
    emit('click')
  }
</script>

<style lang="scss" scoped>
  .primary {
    background-color: $uni-color-primary;
    color: #fff;

    &:active {
      background-color: $uni-active-color-primary;
      color: hsla(0, 0%, 100%, .6);
    }
  }

  .warning {
    background-color: $uni-color-warning;
    color: #fff;

    &:active {
      background-color: $uni-active-color-warning;
      color: hsla(0, 0%, 100%, .6);
    }
  }

  .base {
    &::after {
      border: none;
    }
  }
</style>
