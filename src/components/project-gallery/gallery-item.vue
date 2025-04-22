<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import { computed } from 'vue'
import SolarIcon from '../SolarIcon.vue'
import icons from '../icons'

const props = defineProps<ProjectMedia>()

const src = computed(() => {
  return `/api/files/${props.sha256}?preview=true`
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
      <img class="gallery-item-img" :src="src" />
      <SolarIcon variant="bold-duotone" class="icon-base gallery-item-icon" :icon="icon" />
    </span>
    <figcaption class="gallery-item-caption">{{ props.fileName }}</figcaption>
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

  opacity: 0.75;
  cursor: pointer;
}

.gallery-item:hover {
  opacity: 1;
}

.gallery-item-caption {
  text-align: center;
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
  width: var(--item-width);
  height: var(--item-height);
}

.gallery-item-img {
  @apply shadow-md;

  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: rgba(0 0 0 / 50%);
  border-radius: 3px;
}
</style>
