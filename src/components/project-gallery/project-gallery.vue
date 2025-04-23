<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import GalleryItem from './gallery-item.vue'
import { VDialog } from '../dialog'
import { useModal } from '../modal'
import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { computed, ref } from 'vue'
import { clamp } from '@vueuse/core'

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

const selectedMedia = ref<ProjectMedia | null>(null)

function handleGalleryClick(file: ProjectMedia) {
  selectedMedia.value = file
}

function stepImage(step: number) {
  const index = data.value.findIndex((file) => file.sha256 === selectedMedia.value?.sha256)

  if (index === -1) return

  const nextIndex = clamp(index + step, 0, data.value.length - 1)

  selectedMedia.value = data.value[nextIndex]
}
</script>
<template>
  <VDialog title="Gallery" color="primary">
    <template #body>
      <ul class="gallery-grid">
        <li v-for="file in data" :key="file.sha256">
          <GalleryItem v-bind="file" @click="handleGalleryClick(file)" />
        </li>
      </ul>
      <Teleport to="body" v-if="selectedMedia">
        <div class="gallery-overlay" v-auto-animate>
          <header class="gallery-overlay-header">
            <h3>{{ selectedMedia.fileName }}</h3>
            <span>
              {{ selectedMedia.contentType }}
            </span>
          </header>

          <div
            :key="selectedMedia?.sha256"
            class="flex-grow flex items-center justify-center overflow-hidden"
          >
            <img
              :src="`/api/files/${selectedMedia?.sha256}`"
              class="w-full h-full object-scale-down"
            />
          </div>

          <footer class="gallery-overlay-footer">
            <VButton @click="stepImage(-1)">
              <template #prefix>
                <SolarIcon width="24" icon="alt-arrow-left" variant="bold-duotone" />
              </template>
              Previous
            </VButton>

            <VButton @click="stepImage(1)">
              <template #suffix>
                <SolarIcon width="24" icon="alt-arrow-right" variant="bold-duotone" />
              </template>
              Next
            </VButton>

            <a :href="`/api/files/${selectedMedia?.sha256}`" :download="selectedMedia?.fileName">
              <VButton>
                <template #suffix>
                  <SolarIcon width="24" icon="file-download" variant="bold-duotone" />
                </template>
                Download
              </VButton>
            </a>

            <VButton @click="selectedMedia = null" variant="subdued">
              <template #suffix>
                <SolarIcon width="24" icon="close-circle" variant="bold-duotone" />
              </template>
              Close
            </VButton>
          </footer>
        </div>
      </Teleport>
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
<style lang="css">
.gallery-grid {
  --item-width: 160px;
  --item-height: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--item-width), 1fr));
  justify-items: flex-start;

  gap: 1rem;
}

.gallery-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  overflow: hidden;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.gallery-overlay-header,
.gallery-overlay-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 3rem;
  background-color: rgba(var(--surface) / 95%);

  h3 {
    font-size: 3rem;
  }
}

.gallery-overlay-header {
  flex-direction: column;
  gap: 0;
}
</style>
