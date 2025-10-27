<script setup>
import EditableQuestion from './EditableQuestion.vue'

defineProps(['questions'])
</script>
<template>
  <EditableQuestion v-for="question of questions" :key="question.uuid" :question="question" />
</template>
<style scoped></style>
