<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import { useModal } from '../modal'
import dayjs from 'dayjs'
import { VButton } from '@/components/ui/Button'
import SolarIcon from '@/components/SolarIcon.vue'
import VDialog from '../dialog/v-dialog.vue'

const props = defineProps<{
  files: ProjectMedia[]
  projectId: string
}>()

const emit = defineEmits(['file-uploaded'])

async function handleAddFile(e: MouseEvent) {
  const result = await useModal(
    UploadFileDialog,
    {
      projectId: props.projectId,
      tag: 'primary',
    },
    {
      e,
    },
  )

  if (result) {
    emit('file-uploaded', result)
  }
}
</script>
<template>
  <VDialog title="Primary Media" color="primary" class="w-fit">
    <template #body>
      <ul class="file-list" v-auto-animate>
        <li v-for="file in files" :key="file.sha256" class="file-list-item">
          <router-link
            :to="{ name: 'file', params: { sha256: file.sha256 } }"
            class="flex gap-4 items-center px-4 py-2 hover:bg-sky-500/30"
          >
            <SolarIcon icon="file" class="icon-base" />
            <div class="flex flex-col flex-grow">
              <span class="text-lg">
                {{ file.fileName }}
              </span>
              <span class="text-xs font-mono opacity-60 font-semibold">
                {{ file.sha256.slice(0, 24) }}
              </span>
            </div>
            <div class="text-sm">
              {{ file.contentType }}
            </div>
            <div class="bg-sky-500/50 text-white text-xs font-bold rounded px-2">
              {{ dayjs(file.addedAt).format('YYYY-MM-DD') }}
            </div>
          </router-link>
        </li>
      </ul>
    </template>
    <template #actions>
      <VButton @click="handleAddFile">
        <template #suffix>
          <SolarIcon icon="add-circle" class="icon-base" />
        </template>
        Add File
      </VButton>
    </template>
  </VDialog>
</template>
<style>
.file-list {
  --bg-opacity: 90%;
  /* background-color: rgba(16 16 16 / var(--bg-opacity)); */
}

.file-list-item:nth-child(even) {
  /* background-color: rgba(32 32 32 / var(--bg-opacity)); */
}
</style>
