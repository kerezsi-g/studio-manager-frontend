<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "project-files"
}
</route>
<script setup lang="ts">
import { computed } from 'vue'
import { useProjectData } from '../[projectId].vue'

import { VButton } from '@/components/ui/Button'
import SolarIcon from '@/components/SolarIcon.vue'
import dayjs from 'dayjs'

// const props = defineProps<{}>()

const { data, isLoading } = useProjectData()

const files = computed(() => {
  if (isLoading.value) return []
  if (data.value) return data.value.files
  return []
})

/**
 * ! TODO: Fix handling of duplicate entries (eg. thumbnail)
 */
const totalSize = computed(() => {
  const size = files.value.reduce((acc, file) => acc + file.size, 0)
  return size
})

function formatDate(d: number) {
  return dayjs(d).format('YYYY-MM-DD HH:mm')
}

enum Magnitude {
  KB = 1024,
  MB = 1024 ** 2,
  GB = 1024 ** 3,
}

function formatSize(size: number) {
  if (size < Magnitude.KB) {
    return `${size.toLocaleString()}`
  }

  if (size < Magnitude.MB) {
    return `${(size / Magnitude.KB).toLocaleString()} KB`
  }

  if (size < Magnitude.GB) {
    return `${(size / Magnitude.MB).toLocaleString()} MB`
  }

  return `${(size / Magnitude.GB).toLocaleString()} GB`
}

function getIcon(contentType: string) {
  const [type] = contentType.split('/')
  if (type === 'image') {
    return 'gallery'
  }

  if (type === 'video') {
    return 'clapperboard-play'
  }

  if (type === 'audio') {
    return 'music-note'
  }

  return 'file'
}
</script>
<template>
  <div class="flex flex-col">
    <div class="flex justify-between p-8 text-2xl">
      <span>Total size: {{ formatSize(totalSize) }}</span>
    </div>
  </div>
  <ul class="file-list">
    <header>
      <span />

      <strong>File name</strong>
      <strong>Tag</strong>
      <strong>Size</strong>
      <strong>Created</strong>
      <strong>Uploaded</strong>
    </header>
    <li v-for="file in files" :key="file.sha256" class="file-list-item">
      <SolarIcon :icon="getIcon(file.contentType)" width="24" variant="bold-duotone" />

      <header>
        <h1 class="file-name">
          {{ file.fileName }}
        </h1>
        <h2 class="file-type">
          {{ file.contentType }}
        </h2>
      </header>

      <span class="file-tag">{{ file.tag }}</span>

      <span class="file-size">{{ formatSize(file.size) }}</span>

      <span class="file-date">{{ formatDate(file.createdAt) }}</span>

      <span class="file-date">{{ formatDate(file.uploadedAt) }}</span>

      <span class="flex gap-2">
        <VButton size="sm" color="error" variant="subdued" disabled>
          Delete
          <template #suffix>
            <SolarIcon icon="trash-bin-2" variant="bold-duotone" width="24" />
          </template>
        </VButton>
        <VButton size="sm" color="info" variant="subdued" disabled>
          Download
          <template #suffix>
            <SolarIcon icon="download" variant="bold-duotone" width="24" />
          </template>
        </VButton>
      </span>
    </li>
  </ul>
</template>
<style lang="css">
.file-list {
  /* display: flex; */
  /* flex-direction: column; */

  display: grid;
  grid-template-columns: auto 1fr auto auto auto auto auto;
  grid-auto-flow: row;
  gap: 4px;

  > header {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.25rem 0.75rem;
  }
}

.file-list-item {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem 0.75rem;

  &:hover {
    background-color: rgba(var(--surface-dark) / 50%);
  }

  .file-size {
    font-size: 13px;
    opacity: 0.75;
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
  }

  line-height: normal;

  .file-name {
    font-size: 1rem;
    margin-right: 1rem;
  }

  .file-hash,
  .file-type {
    font-size: 12px;
    font-family: 'Roboto Mono', monospace;
    opacity: 0.75;
  }

  .file-date {
    /* color: rgba(var(--color-main) / 100%); */
    font-size: 12px;
    font-weight: 500;
    /* border-radius: 2px; */
    /* padding: 4px 8px; */
    opacity: 0.8;
  }

  border-left: 4px solid transparent;

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-property: all;

  /* .file-date {} */
}
</style>
