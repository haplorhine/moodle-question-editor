<script setup>
import { ref } from 'vue'
const emit = defineEmits(['importClick']) // instead of emitting an event an event handler could be received from the parent via defineProps and called here
const selectedFile = ref(null)

const handleFileChange = (ev) => {
  const file = ev.target.files[0] ? ev.target.files[0] : null

  selectedFile.value = file
}
</script>
<template>
  <label for="fileInput">Choose an XML file to import</label>
  <input @change="handleFileChange" type="file" id="fileInput" />
  <button @click="emit('importClick', selectedFile)" :disabled="!selectedFile" id="importButton">
    Import
  </button>
</template>
<style scoped></style>
