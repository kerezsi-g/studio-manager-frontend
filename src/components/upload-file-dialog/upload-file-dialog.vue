<script setup lang="ts">
// import { API } from '@/api'
import { VDialog } from '../dialog'
import VButton from '../ui/Button/v-button.vue'

import VTextInput from '../ui/TextInput/v-text-input.vue'
import { ref } from 'vue'
import { useTrackedUpload, type TrackedUpload } from '@/composables/use-tracked-upload'
import { VAlert } from '../alert'
import VFileInput from '../file-input/v-file-input.vue'

import { API } from '@/api'
import type { AssetType } from '@/api-client'
// import type { AssetType } from '@/api-client'

const props = defineProps<{
  projectId: string
  tag: AssetType
  onResolve(fileId: string | null): void
}>()

function handleClose() {
  props.onResolve(null)
}

const fileRef = ref<File>()

const path = ref('')
const uploadFileName = ref('')

const upload = ref<TrackedUpload | null>(null)

async function handleSubmit() {
  if (!fileRef.value) {
    return
  }

  const formData = new FormData()

  formData.append('file', fileRef.value)

  const uploadController = useTrackedUpload<{ fileId: string }>(formData, {
    url: '/api/files',
    method: 'PUT',
  })

  upload.value = uploadController

  const result = await uploadController.execute()

  if (result) {
    await API.Projects.createAsset({
      projectId: props.projectId,
      fileId: result.fileId,
      assetType: props.tag,
    })

    props.onResolve(result.fileId)
  }
}

function extractDefaultName() {
  if (!fileRef.value) {
    uploadFileName.value = ''
    return
  }

  const fileNameWithoutExtension = fileRef.value.name.split('.').slice(0, -1).join('')

  uploadFileName.value = fileNameWithoutExtension
}

function formatPct(pct: number): string {
  return Math.round(pct * 100) + '%'
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
      <VTextInput v-model="path" type="text">
        <template #prefix>
          <span class="text-white opacity-50 text-sm">Path:</span>
        </template>
      </VTextInput>
      <div class="progress-bar">
        <span class="progress-outer">
          <span
            class="progress-inner"
            :style="{ '--width': `${formatPct(upload?.progress ?? 0)}` }"
          />
        </span>
        <span class="progress-text"> {{ formatPct(upload?.progress ?? 0) }} </span>
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
