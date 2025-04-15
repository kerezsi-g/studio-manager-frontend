<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import GalleryItem from './gallery-item.vue'
import { VDialog } from '../dialog'

defineProps<{
  files: ProjectMedia[]
}>()
</script>
<template>
  <VDialog title="Gallery" color="primary">
    <template #body>
      <ul class="gallery-grid">
        <li v-for="file in files" :key="file.sha256">
          <GalleryItem v-bind="file" />
        </li>
      </ul>
    </template>
  </VDialog>
</template>
<style lang="scss">
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  gap: 1rem;
}
</style>
