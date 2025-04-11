<script setup lang="ts">
import { API } from '@/api'
import VDialog from '../dialog/v-dialog.vue'
import VButton from '../ui/Button/v-button.vue'

import VTextInput from '../ui/TextInput/v-text-input.vue'
import { ref } from 'vue'

const props = defineProps<{
  projectId: string
  onResolve(fileId: string | null): void
}>()

function handleClose() {
  props.onResolve(null)
}

const fileRef = ref<File | null>(null)

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  fileRef.value = target.files?.[0] || null
}

// function readbinaryfile(file: File) {
//   return new Promise<ArrayBuffer>((resolve, reject) => {
//     const fr = new FileReader()
//     fr.onload = () => {
//       resolve(fr.result as ArrayBuffer)
//     }
//     fr.onerror = reject
//     fr.readAsArrayBuffer(file)
//   })
// }

// function hashfile(file: File) {
//   return readbinaryfile(file)
//     .then(function (result) {
//       const arrayBuffer = new Uint8Array(result)
//       return window.crypto.subtle.digest('SHA-256', arrayBuffer)
//     })
//     .then(function (result) {
//       const arrayBuffer = new Uint8Array(result)
//       const hexString = Array.from(arrayBuffer)
//         .map((b) => b.toString(16).padStart(2, '0'))
//         .join('')
//       return hexString
//     })
// }

async function handleSubmit() {
  const xhr = new XMLHttpRequest() // create XMLHttpRequest

  // const hash = await hashfile(fileRef.value!)

  const fileName = fileRef.value!.name

  const { uploadUrl } = await API.Files.getUploadUrl({
    GetUploadUrlRequest: {
      fileName,
      hash: fileName,
    },
  })

  await new Promise<void>(async (resolve) => {
    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream') // Set the correct Content-Type
    xhr.send(fileRef.value!)

    xhr.onloadend = () => {
      resolve()
    }
  })

  await API.Projects.addFileToProject({
    category: 'file',
    projectId: props.projectId,
    fileId: fileName,
  })

  props.onResolve(fileName)
}
</script>
<template>
  <VDialog title="Add File To Project" color="primary">
    <template #body>
      <VTextInput type="file" placeholder="choose a file" @change="handleFileChange" />
    </template>
    <template #actions>
      <VButton @click="handleClose" variant="outlined">
        Cancel
        <template #suffix>
          <!-- <SolarIcon icon="x" class="icon-base" /> -->
        </template>
      </VButton>
      <VButton @click="handleSubmit">
        Upload
        <template #suffix>
          <SolarIcon icon="cloud-plus" class="icon-base" />
        </template>
      </VButton>
    </template>
  </VDialog>
</template>
<style lang="scss"></style>
