<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import { computed } from 'vue'
import SolarIcon from '../SolarIcon.vue'
import icons from '../icons'

const props = defineProps<ProjectAsset>()

const src = computed(() => {
  return `/api/files/${props.fileId}/thumbnail`
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

  height: 100%;
  width: 100%;
  /* padding: 16px; */
}

.gallery-item:hover {
  opacity: 1;
}

.gallery-item-caption {
  text-align: left;
  padding-inline: 6px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 5;
  background-color: rgba(0 0 0 / 35%);
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

  height: 100%;
  width: 100%;
  /* height: var(--item-height); */
  /* width: var(--item-width); */
}

.gallery-item-img {
  @apply shadow-md;

  width: 100%;
  height: 100%;
  opacity: 0.75;
  object-fit: cover;
  background-color: rgba(0 0 0 / 50%);

  height: 100%;
  width: 100%;
  /* border-radius: 3px; */
}
</style>
