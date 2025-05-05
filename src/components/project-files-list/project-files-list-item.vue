<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import { computed } from 'vue'
import dayjs from 'dayjs'
import SolarIcon from '@/components/SolarIcon.vue'

interface Props {
  data: ProjectAsset
}

const props = defineProps<Props>()

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
  <li class="file-selector-list-item">
    <SolarIcon :icon="icon" width="24" variant="bold-duotone" />

    <div class="flex flex-col flex-grow">
      <span class="file-name">
        {{ data.assetName }}
      </span>

      <span class="file-type">
        {{ data.contentType }}
      </span>
    </div>

    <span class="file-date">
      {{ formatDate(data.createdAt) }}
    </span>
  </li>
</template>
<style lang="css">
@reference "tailwindcss";

.file-selector-list-item {
  @apply transition-all;
  --bg-opacity: 0;

  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem 0.5rem;
  line-height: normal;

  .file-type {
    font-size: 0.825rem;
    opacity: 0.75;
  }

  .file-date {
    font-size: 0.825rem;
    opacity: 0.75;
    font-weight: 500;
  }

  border-left: 4px solid transparent;

  /* border-radius: 2px; */
}

.file-selector-list-item.selected {
  border-color: rgba(var(--color-main) / 100%);
  background-color: rgba(var(--color-main) / 30%);
  /* transform: translateX(4px); */
}

.file-selector-list-item:hover {
  /* color: rgb(var(--color-accent)); */
  /* transform: translateX(4px); */
  /* box-shadow: 0px 0px 0px 1px rgba(var(--color-main) / 75%); */
}
</style>
