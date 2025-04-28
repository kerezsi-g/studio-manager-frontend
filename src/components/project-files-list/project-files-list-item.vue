<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import { computed } from 'vue'
import dayjs from 'dayjs'
import SolarIcon from '@/components/SolarIcon.vue'

interface Props {
  data: ProjectMedia
  showHash?: boolean
  showTag?: boolean
  showContentType?: boolean
  showCreationDate?: boolean
  showUploadDate?: boolean
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCreationDate: true,
  showContentType: true,
})

function formatDate(d: number) {
  return dayjs(d).format('YYYY-MM-DD HH:mm')
}

const icon = computed(() => {
  const [contentType] = props.data.contentType.split('/')
  if (contentType === 'image') {
    return 'image'
  }

  if (contentType === 'video') {
    return 'video-frame-play-horizontal'
  }

  if (contentType === 'audio') {
    return 'music-note'
  }

  return 'file'
})
</script>
<template>
  <li class="file-list-item">
    <SolarIcon :icon="icon" width="24" variant="bold-duotone" />

    <div class="flex flex-col flex-grow">
      <span class="file-name">
        {{ data.fileName }}
      </span>

      <span class="file-type" v-if="showContentType">
        {{ data.contentType }}
      </span>

      <span class="file-hash" v-if="showHash">
        {{ data.sha256.slice(0, 16) }}
      </span>
    </div>

    <div class="file-date" v-if="showCreationDate">
      {{ formatDate(data.createdAt) }}
    </div>
  </li>
</template>
<style lang="css">
@reference "tailwindcss";

.file-list-item {
  --bg-opacity: 0;

  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.25rem 0.75rem;

  /* border-radius: 2px; */

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
}

.file-list-item.selected {
  border-color: rgba(var(--color-main) / 100%);
  background-color: rgba(var(--color-main) / 30%);
  /* transform: translateX(4px); */
}

.file-list-item:hover {
  /* color: rgb(var(--color-accent)); */
  /* transform: translateX(4px); */
  /* box-shadow: 0px 0px 0px 1px rgba(var(--color-main) / 75%); */
}
</style>
