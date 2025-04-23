<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import { useModal } from '../modal'
import dayjs from 'dayjs'
import { VButton } from '@/components/ui/Button'
import SolarIcon from '@/components/SolarIcon.vue'
import { VDialog } from '../dialog'
import { computed } from 'vue'
import PrimaryFilesListItem from './primary-files-list-item.vue'

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

const data = computed(() => {
  return props.files.filter((file) => file.tag === 'primary')
})
</script>
<template>
  <VDialog title="Primary Media" color="primary" class="w-fit">
    <template #body>
      <ul class="file-list" v-auto-animate>
        <slot v-for="file in data" :key="file.sha256" v-bind="file">
          <PrimaryFilesListItem v-bind="file" />
        </slot>
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* background-color: rgba(16 16 16 / var(--bg-opacity)); */
}

.file-list-item:nth-child(even) {
  /* background-color: rgba(32 32 32 / var(--bg-opacity)); */
}
</style>
