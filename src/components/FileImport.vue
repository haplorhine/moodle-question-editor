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
  <div class="row justify-content-center">
    <label for="fileInput" class="display-6 form-label d-flex justify-content-center">Choose an XML file to import </label>
    <div class="col-6">
      <input @change="handleFileChange" type="file" id="fileInput" class="form-control"/>
    </div>
    <div class="col-1">
    <button class="btn btn-success" @click="emit('importClick', selectedFile)" :disabled="!selectedFile" id="importButton">
    Import
  </button>
  </div>
  </div>




</template>

<style scoped></style>
