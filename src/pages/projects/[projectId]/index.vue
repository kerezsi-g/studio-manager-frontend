<route lang="json">
{
  "name": "project",
  "props": true
}
</route>
<script setup lang="ts">
import { VAlert } from '@/components/alert'
import ProjectDetailsProvider from '@/components/api/ProjectDetailsProvider.vue'
import ProjectPage from '@/components/project-page/project-page.vue'

import AudioProject from '@/views/audio-project.vue'

defineProps<{
  projectId: string
}>()
</script>
<template>
  <ProjectDetailsProvider :projectId="projectId" v-slot="{ data, reload }">
    <ProjectPage v-bind="data">
      <AudioProject v-if="data.projectType === 'audio'" v-bind="data" @changed="reload" />

      <div v-if="data.projectType === 'video'" class="py-16 px-24">
        <VAlert icon="confounded-circle" color="error" title="Unsupported project type">
          User interface for video projects are not supported yet.
        </VAlert>
      </div>

      <div v-if="data.projectType === 'image'" class="py-16 px-24">
        <VAlert icon="confounded-circle" color="error" title="Unsupported project type">
          User interface for photography projects are not supported yet.
        </VAlert>
      </div>
    </ProjectPage>

    <!-- <PageWrapper :title="data.projectName">
      <template #actions>
        <VButton @click="() => $router.back()" class="sm" variant="subdued" color="error">
          <SolarIcon icon="undo-left" class="icon-base" />
        </VButton>
      </template>
      <template #body>
        <div class="flex gap-4 py-2 flex-grow overflow-hidden">
          <PrimaryFilesList :files="data.files" :projectId="projectId" @file-uploaded="reload" />
          <ProjectGallery
            :files="data.files"
            :projectId="projectId"
            class="flex-grow"
            @file-uploaded="reload"
          />
          <ProjectIssues :issues="data.issues" :projectId="projectId" @changed="reload" />
        </div>
      </template>
    </PageWrapper> -->
  </ProjectDetailsProvider>
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
