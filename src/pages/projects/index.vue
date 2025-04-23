<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "app-home"
}
</route>
<script setup lang="ts">
import ProjectsProvider from '@/components/api/ProjectsProvider.vue'
import ProjectsList from '@/components/projects-list/projects-list.vue'
</script>
<template>
  <ProjectsProvider v-slot="{ data, reload }">
    <ProjectsList :projects="data" @project-created="reload" />
  </ProjectsProvider>
</template>
<style lang="scss">
.app-inner {
  // background-color: rgba(0 0 0 /50%);
  backdrop-filter: blur(4px);
  width: 100%;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>
