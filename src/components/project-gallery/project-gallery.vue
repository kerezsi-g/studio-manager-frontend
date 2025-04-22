<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import GalleryItem from './gallery-item.vue'
import { VDialog } from '../dialog'
import { useModal } from '../modal'
import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { computed } from 'vue'

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
      tag: 'gallery',
    },
    { e },
  )

  if (result) {
    emit('file-uploaded', result)
  }
}

const data = computed(() => {
  return props.files.filter((file) => file.tag === 'gallery')
})
</script>
<template>
  <VDialog title="Gallery" color="primary">
    <template #body>
      <ul class="gallery-grid">
        <li v-for="file in data" :key="file.sha256">
          <GalleryItem v-bind="file" />
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
<style lang="scss">
.gallery-grid {
  --item-width: 160px;
  --item-height: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--item-width), 1fr));
  justify-items: flex-start;
  // justify-content: flex-start;
  // padding: 1rem;
  gap: 1rem;
}
</style>
