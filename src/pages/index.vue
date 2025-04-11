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
  <main class="app-home palette-primary">
    <ProjectsProvider v-slot="{ data, reload }">
      <ProjectsList :projects="data" @project-created="reload" />
    </ProjectsProvider>
  </main>
</template>
<style lang="scss">
.app-home {
  // background-color: rgba(0 0 0 /50%);
  backdrop-filter: blur(4px);
  width: 100%;

  display: flex;
  flex-grow: 1;
  flex-direction: column;

  --border: rgba(255 255 255 / 5%);
  background-image: linear-gradient(
    135deg,
    var(--border) 5%,
    transparent 5%,
    transparent 50%,
    var(--border) 50%,
    var(--border) 55%,
    transparent 55%,
    transparent 100%
  );

  background-size: 10px 10px;
}
</style>
