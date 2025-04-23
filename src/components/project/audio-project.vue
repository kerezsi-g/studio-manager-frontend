<script setup lang="ts">
import type { ProjectDetails, ProjectMedia } from '@/api-client'
import { ref } from 'vue'
import PrimaryFilesList from '@/components/primary-files-list/primary-files-list.vue'
import SolarIcon from '@/components/SolarIcon.vue'
import icons from '@/components/icons'
import PrimaryFilesListItem from '@/components/primary-files-list/primary-files-list-item.vue'
import AudioPlayer from '@/components/media/audio-player.vue'
import { ProjectIssuesList, ProjectIssue } from '@/components/project-issues'
import PageWrapper from '../page-wrapper/page-wrapper.vue'

const props = defineProps<ProjectDetails>()

const selectedFile = ref<ProjectMedia | null>(null)

function handleSelectFile(file: ProjectMedia) {
  selectedFile.value = file
}

defineEmits<{
  (c: 'changed'): void
}>()
</script>
<template>
  <header class="project-page-header">
    <h1>
      <SolarIcon :icon="icons.projectType.audio" variant="bold-duotone" />
      {{ props.projectName }}
    </h1>
  </header>
  <div class="flex flex-grow">
    <PrimaryFilesList
      :files="props.files"
      :projectId="projectId"
      v-slot="file"
      @file-uploaded="() => $emit('changed')"
      class="flex-shrink-0"
    >
      <PrimaryFilesListItem
        v-bind="file"
        @click="() => handleSelectFile(file)"
        :class="{ selected: selectedFile?.sha256 === file.sha256 }"
      />
    </PrimaryFilesList>
    <section class="flex flex-col flex-grow">
      <AudioPlayer v-if="selectedFile" v-bind="selectedFile" />
      <ProjectIssuesList :issues="issues" :project-id="projectId" v-slot="issue" class="flex-grow">
        <ProjectIssue v-bind="issue" @issue-resolved="() => $emit('changed')" />
      </ProjectIssuesList>
    </section>
  </div>
</template>
<style lang="css">
.project-page-header {
  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  background-color: rgba(var(--surface-dark) / 95%);
  padding: 0.5rem 2.5rem;
}
</style>
