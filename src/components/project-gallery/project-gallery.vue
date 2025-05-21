<script setup lang="ts">
import type { AssetType, ProjectAsset } from '@/api-client'
import GalleryItem from './gallery-item.vue'
import { useModal } from '../modal'
import UploadFileDialog from '../upload-file-dialog/upload-file-dialog.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { computed, ref } from 'vue'
import { clamp } from '@vueuse/core'
import { API } from '@/api'
import OverlayGallery from './overlay-gallery.vue'

const props = defineProps<{
  assets: ProjectAsset[]
  assetType: AssetType
  projectId: string
}>()

const emit = defineEmits(['file-uploaded'])

async function handleAddFile(e: MouseEvent) {
  const result = await useModal(
    UploadFileDialog,
    {
      projectId: props.projectId,
      tag: props.assetType,
    },
    { e },
  )

  if (result) {
    emit('file-uploaded')
  }
}

const data = computed(() => {
  return props.assets.filter((file) => file.assetType === props.assetType)
})

const selectedMedia = ref<ProjectAsset | null>(null)

function handleGalleryClick(file: ProjectAsset) {
  selectedMedia.value = file
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
    <main class="gallery-grid">
      <TransitionGroup name="v-fade" appear enter>
        <GalleryItem
          v-for="(file, i) in data"
          :data-index="i"
          :key="file.fileId"
          v-bind="file"
          @click="handleGalleryClick(file)"
        />
      </TransitionGroup>
    </main>
    <OverlayGallery
      v-model="selectedMedia"
      :assets="data"
      :projectId="props.projectId"
      @change="$emit('file-uploaded')"
    />
  </div>
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
  --item-width: 240px;
  --item-height: 180px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--item-width), 1fr));
  grid-auto-rows: var(--item-height);
  /* justify-items: center; */
  /* justify-content: flex-start; */
  /* align-content: flex-start; */
  /* align-items: center; */
  place-items: center center;
  gap: 4px;
  flex-grow: 1;
  overflow: auto;

  /* background-color: rgba(var(--surface-dark) / 75%); */
  padding-inline: 1rem;
}

.v-fade-enter-active,
.v-fade-leave-active {
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  transition-property: opacity, transform;
  transition-delay: calc(10ms * attr(data-index type(<number>)));
  transform: scale(1);
}

.v-fade-enter-from,
.v-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
