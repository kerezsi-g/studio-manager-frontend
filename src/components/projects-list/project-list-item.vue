<script setup lang="ts">
import type { Project } from '@/api-client'
import { computed } from 'vue'
import dayjs from 'dayjs'

import SolarIcon from '../SolarIcon.vue'
import icons from '../icons'

const props = defineProps<Project>()

const formattedDate = computed(() => {
  return dayjs(props.createdAt).format('YYYY-MM-DD')
})

const routeTo = computed(() => {
  return {
    name: 'project',
    params: { projectId: props.projectId },
  }
})

const icon = computed(() => {
  if (props.projectType === 'video') {
    return icons.projectType.video
  }
  if (props.projectType === 'audio') {
    return icons.projectType.audio
  }
  if (props.projectType === 'image') {
    return icons.projectType.image
  }

  return 'folder'
})

const thumbnailUrl = computed(() => {
  if (props.thumbnail) {
    return `url('/api/files/${props.thumbnail}?preview=true')`
  }

  return undefined
})
</script>
<template>
  <li class="project-list-item">
    <router-link :to="routeTo" class="folder-link">
      <span class="project-thumbnail" :style="{ backgroundImage: thumbnailUrl }">
        <SolarIcon :icon="icon" class="icon-xl" variant="bold-duotone" v-if="!thumbnailUrl" />
      </span>
      <h4 class="project-timestamp">
        <SolarIcon icon="calendar-minimalistic" class="icon-sm" />
        <span>{{ formattedDate }}</span>
      </h4>
      <h3>{{ projectName }}</h3>
    </router-link>
  </li>
</template>
<style lang="css">
@reference 'tailwindcss';

.project-thumbnail {
  width: 128px;
  height: 128px;

  border-radius: 5px;
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  /* @apply shadow-xl; */
  /* box-shadow: inset 0px 0px 3px rgba(255 255 255 / 25%); */
}

.project-list-item {
  display: block;
  width: var(--width);

  h3 {
    font-weight: 500;
  }

  .project-timestamp {
    font-size: 0.825rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: normal;
    background-color: rgba(0 0 0 / 75%);
    padding: 4px 8px;
    border-radius: 32px;
  }
}

.project-list-item:hover {
  color: rgb(var(--color-accent));
  --bg-opacity: 25%;
}

.folder-link {
  @apply transition-all;
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgba(var(--color-main) / var(--bg-opacity, 0%));

  cursor: pointer;

  h3 {
    font-size: 1.25rem;
    font-weight: 300;
    text-align: center;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  background-color: rgba(var(--color-main) / var(--bg-opacity, 0%));
}
</style>
