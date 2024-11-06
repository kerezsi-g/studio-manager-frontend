<script setup lang="ts">
import type { ProjectMetadata } from '@/api/types'

import ProjectsListItem from './components/ProjectsListItem.vue'

defineProps<{
  data: ProjectMetadata[]
}>()
</script>
<template>
  <div class="panel surface-0">
    <header class="panel-header">Projects</header>
    <ul class="projects-list">
      <template v-for="(folder, i) in data" :key="i">
        <!-- {{ folder }} -->
        <ProjectsListItem v-bind="folder" />
      </template>
    </ul>
  </div>
</template>
<style lang="scss">
.projects-list {
  @apply flex flex-col gap-4 items-start;
  //   @apply px-8 py-4;
  margin-inline: auto;
}
</style>
