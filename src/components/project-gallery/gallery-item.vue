<script setup lang="ts">
import { API } from '@/api'
import type { ProjectMedia } from '@/api-client'
import { computed, onMounted, ref } from 'vue'
import { VSpinner } from '../ui/Spinner'

const props = defineProps<ProjectMedia>()

const src = ref('')

async function getUrl() {
  const { url } = await API.Files.getAccessUrl({
    sha256: props.sha256,
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
  <figure class="gallery-item" v-if="contentType === 'image'">
    <span v-if="src" class="gallery-item-main">
      <img :src="src" />
    </span>
    <VSpinner v-else />
    <figcaption class="gallery-item-caption">{{ props.fileName }}</figcaption>
  </figure>
</template>
<style lang="scss">
.gallery-item {
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 160px;
  height: 120px;
}

.gallery-item-caption {
  text-align: center;
}

.gallery-item-main {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: rgba(0 0 0 / 50%);
    border-radius: 3px;
  }
}
</style>
