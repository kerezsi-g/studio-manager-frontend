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
</script>
<template>
  <li class="project-list-item">
    <router-link :to="routeTo" class="folder-link">
      <span>
        <SolarIcon :icon="icon" class="icon-xl" variant="bold-duotone" />
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
</style>
