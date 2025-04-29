<script setup lang="ts">
import type { Project } from '@/api-client'
import { computed } from 'vue'
// import dayjs from 'dayjs'

import SolarIcon from '../SolarIcon.vue'
import icons from '../icons'

const props = defineProps<Project>()

// const formattedDate = computed(() => {
//   return dayjs(props.createdAt).format('YYYY-MM-DD')
// })

const routeTo = computed(() => {
  return {
    name: 'project-root',
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
  <router-link :to="routeTo" class="folder-link">
    <li class="project-list-item">
      <span class="project-thumbnail" :style="{ backgroundImage: thumbnailUrl }">
        <SolarIcon :icon="icon" class="icon-xl" variant="bold-duotone" v-if="!thumbnailUrl" />
      </span>
      <h1>
        {{ projectName }}
      </h1>
      <hr class="divider" />
      <h2>{{ subject }}</h2>
    </li>
  </router-link>
</template>
<style lang="css">
@reference 'tailwindcss';

.project-thumbnail {
  --size: 192px;

  width: var(--size);
  height: var(--size);

  border-radius: 2px;
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(var(--surface-dark) / 2575%);

  /* @apply shadow-xl; */
  /* box-shadow: inset 0px 0px 3px rgba(255 255 255 / 25%); */
}

.project-list-item {
  /* @apply shadow-lg; */

  display: flex;
  flex-direction: column;
  padding: 8px;

  background-color: rgba(var(--surface-dark) / 50%);
  backdrop-filter: blur(8px);
  border-radius: 6px;

  h1 {
    text-shadow: 0 0 2px rgba(0 0 0 / 25%);
    font-weight: 500;
    font-size: 1.25rem;
    padding: 4px;
  }

  h2 {
    font-size: 1rem;
    opacity: 0.8;
    padding-inline: 0.25rem;
    font-weight: 400;
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
</style>
