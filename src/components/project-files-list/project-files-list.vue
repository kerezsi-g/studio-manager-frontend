<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import { computed } from 'vue'

import SolarIcon from '@/components/SolarIcon.vue'
import { useModal } from '../modal'
import { VButton } from '@/components/ui/Button'
import { VList } from '../ui/List'

import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import PrimaryFilesListItem from './project-files-list-item.vue'

const props = defineProps<{
  assets: ProjectAsset[]
  projectId: string
}>()

const emit = defineEmits(['file-uploaded'])

async function handleAddFile(e: MouseEvent) {
  const result = await useModal(
    UploadFileDialog,
    {
      projectId: props.projectId,
      tag: 'pending-review',
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
  return props.assets.filter((asset) => asset.tag === 'pending-review')
})
</script>
<template>
  <VList title="Uploads:" class="project-file-selector">
    <template #actions>
      <VButton @click="handleAddFile" size="sm" variant="subdued">
        <template #suffix>
          <SolarIcon icon="add-circle" width="20" variant="bold" />
        </template>
        Add File
      </VButton>
    </template>

    <template #items>
      <slot v-for="asset in data" :key="asset.assetId" v-bind="asset">
        <PrimaryFilesListItem :data="asset" />
      </slot>
    </template>
  </VList>
</template>
<style lang="css">
.project-file-selector {
  display: flex;
  flex-direction: column;
}
</style>
