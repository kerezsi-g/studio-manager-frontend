<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import { computed } from 'vue'

import SolarIcon from '@/components/SolarIcon.vue'
import { useModal } from '../modal'
import { VButton } from '@/components/ui/Button'
import { VList } from '../ui/List'

import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
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
  <VList title="Uploads:">
    <template #actions>
      <VButton @click="handleAddFile" size="sm" variant="subdued">
        <template #suffix>
          <SolarIcon icon="add-circle" width="20" variant="bold" />
        </template>
        Add File
      </VButton>
    </template>

    <template #items>
      <slot v-for="file in data" :key="file.sha256" v-bind="file">
        <PrimaryFilesListItem v-bind="file" />
      </slot>
    </template>
  </VList>
</template>
<style lang="css"></style>
