<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import GalleryItem from './gallery-item.vue'
import { useModal } from '../modal'
import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { computed, ref } from 'vue'
import { clamp } from '@vueuse/core'
import { API } from '@/api'

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
      tag: 'misc',
    },
    { e },
  )

  if (result) {
    emit('file-uploaded')
  }
}

const data = computed(() => {
  /**
   * TODO: Fix
   */
  return props.assets.filter((file) => file.tag === 'misc')
})

const selectedMedia = ref<ProjectAsset | null>(null)

function handleGalleryClick(file: ProjectAsset) {
  selectedMedia.value = file
}

function stepImage(step: number) {
  const index = data.value.findIndex((file) => file.assetId === selectedMedia.value?.assetId)

  if (index === -1) return

  const nextIndex = clamp(index + step, 0, data.value.length - 1)

  selectedMedia.value = data.value[nextIndex]
}

async function setFileAs(file: ProjectAsset, tag: 'thumbnail' | 'background-image') {
  await API.Projects.addAssetToProject({
    projectId: props.projectId,
    assetId: file.assetId,
    tag,
  })

  emit('file-uploaded')
}
</script>
<template>
  <div class="project-gallery">
    <nav>
      <VButton @click="handleAddFile" variant="subdued">
        <template #suffix>
          <SolarIcon icon="add-circle" class="icon-base" />
        </template>
        Add File
      </VButton>
    </nav>
    <ul class="gallery-grid">
      <li v-for="file in data" :key="file.assetId">
        <GalleryItem v-bind="file" @click="handleGalleryClick(file)" />
      </li>
    </ul>
  </div>

  <Teleport to="body" v-if="selectedMedia">
    <div class="gallery-overlay" v-auto-animate>
      <header class="gallery-overlay-header">
        <h3>{{ selectedMedia.assetName }}</h3>
        <span>
          {{ selectedMedia.contentType }}
        </span>
      </header>

      <div
        :key="selectedMedia.assetId"
        class="flex-grow flex items-center justify-center overflow-hidden"
      >
        <img
          :src="`/api/assets/${selectedMedia.assetId}/files/base`"
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

        <a
          :href="`/api/files/${selectedMedia.assetId}?download=true`"
          :download="selectedMedia.assetName"
        >
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

        <VButton :action="() => setFileAs(selectedMedia!, 'background-image')" variant="subdued">
          <template #suffix>
            <SolarIcon width="24" icon="gallery-check" variant="bold-duotone" />
          </template>
          Make Background
        </VButton>

        <VButton :action="() => setFileAs(selectedMedia!, 'thumbnail')" variant="subdued">
          <template #suffix>
            <SolarIcon width="24" icon="gallery-check" variant="bold-duotone" />
          </template>
          Make Thumbnail
        </VButton>
      </footer>
    </div>
  </Teleport>
</template>
<style lang="css">
.project-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 4rem;
  overflow: hidden;
  flex-grow: 1;

  > nav {
    display: flex;
    justify-content: center;
  }
}

.gallery-grid {
  --item-width: 160px;
  --item-height: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--item-width), 1fr));
  justify-items: center;
  /* justify-content: flex-start; */
  align-content: flex-start;
  /* align-items: center; */
  gap: 1rem;
  flex-grow: 1;
  overflow: auto;
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
  background-color: rgba(var(--surface) / 75%);

  h3 {
    font-size: 3rem;
  }
}

.gallery-overlay-header {
  flex-direction: column;
  gap: 0;
}
</style>
