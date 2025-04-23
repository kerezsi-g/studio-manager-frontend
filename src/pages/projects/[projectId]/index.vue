<route lang="json">
{
  "name": "project",
  "props": true
}
</route>
<script setup lang="ts">
import ProjectDetailsProvider from '@/components/api/ProjectDetailsProvider.vue'

import PrimaryFilesList from '@/components/primary-files-list/primary-files-list.vue'
import ProjectGallery from '@/components/project-gallery/project-gallery.vue'
import ProjectIssues from '@/components/project-issues/project-issues.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import PageWrapper from '@/components/page-wrapper/page-wrapper.vue'
import AudioProject from '@/components/project/audio-project.vue'

defineProps<{
  projectId: string
}>()
</script>
<template>
  <ProjectDetailsProvider :projectId="projectId" v-slot="{ data, reload }">
    <AudioProject v-bind="data" v-if="data.projectType === 'audio'" @changed="reload" />

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
