<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import { computed } from 'vue'
import SolarIcon from '../SolarIcon.vue'
import icons from '../icons'

const props = defineProps<ProjectAsset>()

const src = computed(() => {
  return `/api/assets/${props.assetId}/files/thumbnail`
})

const contentType = computed(() => {
  const [contentType] = props.contentType.split('/')
  return contentType as 'video' | 'image' | 'audio'
})

const icon = computed(() => {
  if (contentType.value === 'video') {
    return icons.fileType.video
  }
  if (contentType.value === 'image') {
    return icons.fileType.image
  }
  if (contentType.value === 'audio') {
    return icons.fileType.audio
  }

  return 'folder'
})
</script>
<template>
  <figure class="gallery-item">
    <span class="gallery-item-main">
      <img class="gallery-item-img" :src="src" :title="assetName" />
      <SolarIcon variant="bold" class="icon-base gallery-item-icon" :icon="icon" />
    </span>
    <figcaption class="gallery-item-caption" :title="assetName">
      {{ assetName }}
    </figcaption>
  </figure>
</template>
<style lang="css">
@reference 'tailwindcss';

.gallery-item {
  position: relative;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;

  opacity: 0.9;
  cursor: pointer;

  background-color: rgba(0 0 0 / 50%);
  /* padding: 16px; */
}

.gallery-item:hover {
  opacity: 1;
}

.gallery-item-caption {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: var(--item-width);
}

.gallery-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 4px;
  right: 4px;

  z-index: 100;

  /* color: rgba(var(--color-main)); */
}

.gallery-item-main {
  display: block;
  position: relative;
  height: var(--item-height);
  width: var(--item-width);
}

.gallery-item-img {
  @apply shadow-md;

  width: 100%;
  height: 100%;
  opacity: 0.75;
  object-fit: cover;
  background-color: rgba(0 0 0 / 50%);
  border-radius: 3px;
}
</style>
