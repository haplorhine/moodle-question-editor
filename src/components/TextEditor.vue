<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const html = defineModel('html')

const editor = ref<InstanceType<typeof QuillyEditor>>()

let quill: Quill | undefined

const options = {
  header: '1',
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
}

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
  <QuillyEditor ref="editor" v-model="html" :options="options" />
</template>
