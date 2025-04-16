<script setup lang="ts">
import { API } from '@/api'
import type { ProjectMedia } from '@/api-client'
import { computed, onMounted, ref } from 'vue'
import { VSpinner } from '../ui/Spinner'
import SolarIcon from '../SolarIcon.vue'

const props = defineProps<ProjectMedia>()

const src = ref('')

async function getUrl() {
  const { url } = await API.Files.getAccessUrl({
    sha256: props.sha256,
    preview: true,
  })

  src.value = url
}

const contentType = computed(() => {
  const [contentType] = props.contentType.split('/')
  return contentType as 'video' | 'image' | 'audio'
})

onMounted(() => {
  getUrl()
})
</script>
<template>
  <figure class="gallery-item">
    <span v-if="src" class="gallery-item-main">
      <img :src="src" />
      <SolarIcon
        v-if="contentType === 'video'"
        variant="bold-duotone"
        class="icon-base gallery-item-icon"
        icon="video-frame-play-vertical"
      />
      <SolarIcon
        v-if="contentType === 'image'"
        variant="bold-duotone"
        class="icon-base gallery-item-icon"
        icon="camera"
      />
    </span>
    <VSpinner v-else />
    <figcaption class="gallery-item-caption">{{ props.fileName }}</figcaption>
  </figure>
</template>
<style lang="scss">
.gallery-item {
  position: relative;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;

  opacity: 0.9;
  // overflow: hidden;
}

.gallery-item:hover {
  opacity: 1;
}

.gallery-item-caption {
  text-align: center;
}

.gallery-item-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 5);

  z-index: 100;
}

.gallery-item-main {
  display: block;
  position: relative;
  width: var(--item-width);
  height: var(--item-height);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: rgba(0 0 0 / 50%);
    border-radius: 3px;
  }
}
</style>
