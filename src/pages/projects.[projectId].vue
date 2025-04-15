<route lang="json">
{
  "name": "project",
  "props": true
}
</route>
<script setup lang="ts">
import type { ProjectMedia } from '@/api-client'
import ProjectDetailsProvider from '@/components/api/ProjectDetailsProvider.vue'

import PrimaryFilesList from '@/components/primary-files-list/primary-files-list.vue'
import ProjectGallery from '@/components/project-gallery/project-gallery.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'

defineProps<{
  projectId: string
}>()
</script>
<template>
  <main id="project-root" class="palette-primary">
    <ProjectDetailsProvider :projectId="projectId" v-slot="{ data, reload }">
      <header>
        <SolarIcon icon="folder-2" class="icon-base" />
        <span>{{ data.projectName }}</span>

        <VButton @click="() => $router.back()" class="sm" variant="subdued" color="error">
          <SolarIcon icon="undo-left" class="icon-base" />
        </VButton>
      </header>

      <div class="p-4 flex gap-4">
        <PrimaryFilesList :files="data.files" :projectId="projectId" @file-uploaded="reload" />
        <ProjectGallery :files="data.files" />
      </div>
    </ProjectDetailsProvider>
  </main>
</template>
<style lang="scss">
#project-root {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  & > header {
    font-size: 2rem;
    font-weight: 300;
    padding: 1rem 4rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    background-color: rgba(0 0 0 / 80%);
  }
}
</style>
