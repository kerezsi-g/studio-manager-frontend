<script setup lang="ts">
import type { Issue, ProjectDetails, ProjectMedia } from '@/api-client'
import { computed, onMounted, ref } from 'vue'

import ProjectFilesList from '@/components/project-files-list/project-files-list.vue'
import ProjectFilesListItem from '@/components/project-files-list/project-files-list-item.vue'

import AudioPlayer from '@/components/media/audio-player.vue'
import { ProjectIssuesList, ProjectIssue } from '@/components/project-issues'
import { useModal } from '@/components/modal'
import SubmitIssueDialog from '@/components/submit-issue-dialog/submit-issue-dialog.vue'
import TimestampMarker from '@/components/media/components/TimestampMarker.vue'
import ProjectGallery from '@/components/project-gallery/project-gallery.vue'

const props = defineProps<ProjectDetails>()

const selectedFile = ref<ProjectMedia | null>(null)

function handleSelectFile(file: ProjectMedia) {
  selectedFile.value = file
}

const emit = defineEmits<{
  (c: 'changed'): void
}>()

onMounted(() => {
  if (props.files.length > 0) {
    handleSelectFile(props.files[0])
  }
})

const issueToCreate = ref<number | null>()

async function handleSubmitIssue(e: MouseEvent, timestamp?: number, length?: number) {
  issueToCreate.value = timestamp

  const result = await useModal(
    SubmitIssueDialog,
    {
      projectId: props.projectId,
      sha256: selectedFile.value!.sha256,
      timestamp,
      duration: length,
    },
    {
      e,
    },
  )

  issueToCreate.value = null

  if (result) {
    emit('changed')
  }
}

const pendingIssues = computed(() => {
  return props.issues.filter((issue) => !issue.resolvedAt)
})

/**
 * Filters issues to the currently selected file
 */
function issueFilter(issue: Issue) {
  return issue.file === selectedFile.value?.sha256
}

const view = ref<'main' | 'gallery'>('main')
</script>
<template>
  <nav class="project-navigation">
    <span class="project-nav-link" @click="view = 'main'" :class="{ active: view === 'main' }">
      Main
    </span>
    <span
      class="project-nav-link"
      @click="view = 'gallery'"
      :class="{ active: view === 'gallery' }"
    >
      Gallery
    </span>
  </nav>

  <hr class="divider" />

  <template v-if="view === 'main'">
    <AudioPlayer v-if="selectedFile" v-bind="selectedFile" @submit-issue="handleSubmitIssue">
      <template #markers-back>
        <TimestampMarker
          v-for="issue in pendingIssues.filter(issueFilter)"
          :key="issue.issueId"
          :at="issue.timestamp!"
          class="color-issue"
        >
          <template #label-bottom> {{ issue.description }} </template>
        </TimestampMarker>
      </template>

      <template #markers-front>
        <TimestampMarker v-if="issueToCreate" :at="issueToCreate" class="color-issue">
          <!-- <template #label-top> {{ formatTime(issueToCreate) }} </template> -->
        </TimestampMarker>
      </template>
    </AudioPlayer>

    <hr class="divider" />

    <div class="flex-grow overflow-hidden grid grid-cols-2">
      <ProjectFilesList
        :files="files"
        :projectId="projectId"
        @file-uploaded="$emit('changed')"
        v-slot="file"
      >
        <ProjectFilesListItem
          :data="file"
          @click="() => handleSelectFile(file)"
          :class="{ selected: file.sha256 === selectedFile?.sha256 }"
        />
      </ProjectFilesList>

      <ProjectIssuesList
        :issues="issues.filter(issueFilter)"
        :project-id="projectId"
        v-slot="issue"
      >
        <ProjectIssue v-bind="issue" @issue-resolved="() => $emit('changed')" />
      </ProjectIssuesList>
    </div>
  </template>

  <template v-if="view === 'gallery'">
    <ProjectGallery :files="files" :projectId="projectId" @file-uploaded="$emit('changed')" />
  </template>
</template>
<style lang="css">
.color-issue {
  --color-main: 185 28 46;
}
</style>
