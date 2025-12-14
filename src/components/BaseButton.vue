<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Button',
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="d-flex justify-content-center mb-3">
    <button class="btn btn-primary btn-lg" @click="handleClick" :title="title">
      {{ text }}
    </button>
  </div>
</template>
