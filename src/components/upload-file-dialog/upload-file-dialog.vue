<script setup lang="ts">
import { API } from '@/api'
import { VDialog } from '../dialog'
import VButton from '../ui/Button/v-button.vue'

import VTextInput from '../ui/TextInput/v-text-input.vue'
import { ref } from 'vue'
import { useS3Upload, type S3Upload } from '@/composables/use-s3-upload'
import { VAlert } from '../alert'
import VFileInput from '../file-input/v-file-input.vue'

const props = defineProps<{
  projectId: string
  tag: string
  onResolve(fileId: string | null): void
}>()

function handleClose() {
  props.onResolve(null)
}

const fileRef = ref<File>()

const path = ref('')
const uploadFileName = ref('')

const upload = ref<S3Upload | null>(null)

async function handleSubmit() {
  const uploadController = await useS3Upload(fileRef.value!)

  upload.value = uploadController

  const sha256 = await uploadController.start()

  if (!sha256) {
    return
  }

  await API.Projects.addFileToProject({
    tag: props.tag,
    projectId: props.projectId,
    fileName: uploadFileName.value,
    sha256,
  })

  props.onResolve(sha256)
}

function extractDefaultName() {
  if (!fileRef.value) {
    uploadFileName.value = ''
    return
  }

  const fileNameWithoutExtension = fileRef.value.name.split('.').slice(0, -1).join('')

  uploadFileName.value = fileNameWithoutExtension
}
</script>
<template>
  <VDialog title="Add File To Project" color="primary" class="padded" icon="cloud-plus">
    <template #body>
      <VAlert title="Demo feature" color="warning" icon="shield-warning">
        <p>Uploading files from the browser is made available for demo purposes only.</p>
        <p>File sizes are limited.</p>
      </VAlert>
      <VFileInput
        v-model="fileRef"
        label="Choose a File"
        :max-size="300"
        @file-changed="extractDefaultName"
      />
      <VTextInput v-model="uploadFileName" type="text">
        <template #prefix>
          <span class="text-white opacity-50 text-sm">Filename:</span>
        </template>
      </VTextInput>
      <VTextInput :model-value="tag" type="text" readonly>
        <template #prefix>
          <span class="text-white opacity-50 text-sm">Tag:</span>
        </template>
      </VTextInput>
      <VTextInput v-model="path" type="text">
        <template #prefix>
          <span class="text-white opacity-50 text-sm">Path:</span>
        </template>
      </VTextInput>
      <div class="progress-bar">
        <span class="progress-outer">
          <span
            class="progress-inner"
            :style="{ '--width': `${(upload?.progress ?? 0) * 100}%` }"
          />
        </span>
        <span class="progress-text"> {{ upload?.progress ?? 0 }}% </span>
      </div>
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
<style lang="scss">
.progress-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // gap: 4rem;
}

.progress-outer {
  display: block;
  width: 100%;
  height: 10px;
  background-color: rgba(var(--color-main) / var(--bg-opacity, 50%));
  border-radius: 5px;
  overflow: hidden;
  padding: 2px;
}

.progress-inner {
  display: block;
  height: 100%;
  background-color: rgba(var(--color-accent) / var(--bg-opacity, 100%));
  border-radius: 5px;
  transition: width 0.3s ease;
  width: var(--width);
}
</style>
