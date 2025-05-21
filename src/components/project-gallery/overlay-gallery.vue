<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import { clamp } from '@vueuse/core'

import { VButton } from '@/components/ui/Button'
import { API } from '@/api'

const selectedMedia = defineModel<ProjectAsset | null>({
  default: null,
})

const emit = defineEmits(['change'])

const props = defineProps<{
  assets: ProjectAsset[]
  projectId: string
}>()

function step(step: number) {
  const index = props.assets.findIndex((file) => file.fileId === selectedMedia.value?.fileId)

  if (index === -1) return

  const nextIndex = clamp(index + step, 0, props.assets.length - 1)

  selectedMedia.value = props.assets[nextIndex]
}

async function setFileAs(file: ProjectAsset, type: 'thumbnail' | 'background-image') {
  await API.Projects.createAsset({
    projectId: props.projectId,
    fileId: file.fileId,
    assetType: type,
  })

  emit('change')
}
</script>
<template>
  <Teleport to="body" v-if="selectedMedia">
    <div class="gallery-overlay" v-auto-animate>
      <header class="gallery-overlay-header">
        <h3>{{ selectedMedia.assetName }}</h3>
        <span>
          {{ selectedMedia.contentType }}
        </span>
      </header>

      <div
        :key="selectedMedia.fileId"
        class="flex-grow flex items-center justify-center overflow-hidden"
      >
        <img :src="`/api/files/${selectedMedia.fileId}`" class="w-full h-full object-scale-down" />
      </div>

      <footer class="gallery-overlay-footer">
        <VButton @click="step(-1)">
          <template #prefix>
            <SolarIcon width="24" icon="alt-arrow-left" variant="bold-duotone" />
          </template>
          Previous
        </VButton>

        <VButton @click="step(1)">
          <template #suffix>
            <SolarIcon width="24" icon="alt-arrow-right" variant="bold-duotone" />
          </template>
          Next
        </VButton>

        <a
          :href="`/api/files/${selectedMedia.fileId}?download=true`"
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
  padding: 1rem 2rem;
  background-color: rgba(var(--surface) / 50%);

  h3 {
    font-size: 3rem;
  }
}

.gallery-overlay-header {
  flex-direction: column;
  gap: 0;
  line-height: normal;
}
</style>
