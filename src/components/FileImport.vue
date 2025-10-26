<script setup>
import { ref } from 'vue'
const emit = defineEmits(['response']) // instead of emitting an event an event handler could be received from the parent via defineProps and called here
const selectedFile = ref(null)

const handleImport = () => {
  if (!selectedFile) {
    return
  }

  selectedFile.text().then((fileText) => onFileRead(fileText))
}

const handleFileChange = (ev) => {
  const file = ev.target.files[0] ? ev.target.files[0] : null

  selectedFile.value = file
  console.log(selectedFile.value)
  emit('response', selectedFile)
}
</script>
<template>
  <label for="fileInput">Choose an XML file to import</label>
  <input @change="handleFileChange" type="file" id="fileInput" />
  <button disabled id="importButton">Import</button>
</template>
<style scoped></style>
