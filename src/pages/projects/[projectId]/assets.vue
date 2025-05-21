<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "project-assets"
}
</route>
<script setup lang="ts">
import { computed } from 'vue'
import { useProjectData } from '../[projectId].vue'

import { VButton } from '@/components/ui/Button'
import SolarIcon from '@/components/SolarIcon.vue'
import dayjs from 'dayjs'
import { API } from '@/api'
import AssetStats from '@/components/asset-stats/asset-stats.vue'
import { formatBytes } from '@/components/asset-stats/format-file-size'

const { data, isLoading } = useProjectData()

const assets = computed(() => {
  if (isLoading.value) return []
  if (data.value) return data.value.assets
  return []
})

function formatDate(d: number) {
  return dayjs(d).format('YYYY-MM-DD HH:mm')
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
  <div class="flex overflow-auto items-start px-8 gap-4 py-4">
    <ul class="file-list">
      <header>
        <span />

        <strong>File name</strong>
        <!-- <strong>Tag</strong> -->
        <strong>Size</strong>
        <strong>Created</strong>
        <strong>Uploaded</strong>
      </header>
      <li v-for="asset in assets" :key="asset.fileId" class="file-list-item">
        <SolarIcon :icon="getIcon(asset.contentType)" width="24" variant="bold-duotone" />

        <header>
          <h1 class="file-name">
            {{ asset.assetName }}
          </h1>
          <h2 class="file-type">
            {{ asset.contentType }}
          </h2>
        </header>

        <!-- <span class="file-tag">{{ asset.tag }}</span> -->

        <span class="file-size">{{ formatBytes(asset.size) }}</span>

        <span class="file-date">{{ formatDate(asset.uploadedAt) }}</span>

        <span class="flex gap-2">
          <VButton size="sm" color="error" variant="subdued" disabled>
            Delete
            <template #suffix>
              <SolarIcon icon="trash-bin-2" variant="bold-duotone" width="24" />
            </template>
          </VButton>
          <a :href="`/api/files/${asset.fileId}?download=true`">
            <VButton size="sm" color="info" variant="subdued">
              Download
              <template #suffix>
                <SolarIcon icon="download" variant="bold-duotone" width="24" />
              </template>
            </VButton>
          </a>
        </span>
      </li>
    </ul>
    <AssetStats :assets="assets" />
  </div>
</template>
<style lang="css">
.file-list {
  /* display: flex; */
  /* flex-direction: column; */

  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: flex-start;

  grid-auto-flow: row;
  gap: 4px;

  padding: 1rem 2rem;

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
    font-size: 12px;
    opacity: 0.5;
    font-family: 'Roboto Mono', monospace;
    font-weight: 600;
    /* text-align: right; */
  }

  line-height: normal;

  .file-name {
    font-size: 1rem;
    padding-right: 3rem;
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
    opacity: 0.85;
  }

  border-left: 4px solid transparent;

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-property: all;

  /* .file-date {} */
}
</style>
