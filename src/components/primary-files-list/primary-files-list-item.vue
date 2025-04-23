<script lang="ts">
const SHOW_HASH = ref(false)
</script>
<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import SolarIcon from '@/components/SolarIcon.vue'

const props = defineProps<ProjectMedia>()

const formattedDate = computed(() => {
  return dayjs(props.addedAt).format('YYYY-MM-DD')
})

const icon = computed(() => {
  const [contentType] = props.contentType.split('/')
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
    <SolarIcon :icon="icon" class="icon-base" variant="bold-duotone" />

    <div class="flex flex-col flex-grow">
      <span class="file-name">
        {{ fileName }}
      </span>

      <span class="file-type">
        {{ contentType }}
      </span>

      <span class="file-hash" v-if="SHOW_HASH">
        {{ sha256.slice(0, 16) }}
      </span>
    </div>

    <div class="file-date">
      {{ formattedDate }}
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
  padding: 0.5rem 1rem;

  background-color: rgba(var(--color-main) / var(--bg-opacity));

  line-height: normal;

  .file-name {
    font-size: 1.25rem;
  }

  .file-hash,
  .file-type {
    font-size: 12px;
    font-family: 'Roboto Mono', monospace;
    opacity: 0.75;
  }

  .file-date {
    background-color: rgba(var(--color-main) / 50%);
    font-size: 12px;
    font-weight: 500;
    border-radius: 2px;
    padding: 2px 8px;
  }
}

.file-list-item.selected {
  --bg-opacity: 30%;
}

.file-list-item:hover {
  --bg-opacity: 20%;
}
</style>
