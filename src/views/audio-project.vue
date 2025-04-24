<script setup lang="ts">
import type { ProjectDetails, ProjectMedia } from '@/api-client'
import { computed, onMounted, ref } from 'vue'

import PrimaryFilesList from '@/components/primary-files-list/primary-files-list.vue'
import PrimaryFilesListItem from '@/components/primary-files-list/primary-files-list-item.vue'

import AudioPlayer from '@/components/media/audio-player.vue'
import { ProjectIssuesList, ProjectIssue } from '@/components/project-issues'
import { useModal } from '@/components/modal'
import SubmitIssueDialog from '@/components/submit-issue-dialog/submit-issue-dialog.vue'
import TimestampMarker from '@/components/media/components/TimestampMarker.vue'

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

async function handleSubmitIssue(e: MouseEvent, timestamp?: number, length?: number) {
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

  if (result) {
    emit('changed')
  }
}

const pendingIssues = computed(() => {
  return props.issues.filter((issue) => !issue.resolvedAt)
})
</script>
<template>
  <AudioPlayer v-if="selectedFile" v-bind="selectedFile" @submit-issue="handleSubmitIssue">
    <template #markers="{ currentTime, duration }">
      <TimestampMarker
        v-for="issue in pendingIssues"
        :key="issue.issueId"
        :at="issue.timestamp!"
        :currentTime="currentTime"
        :duration="duration"
      >
        {{ issue.description }}
      </TimestampMarker>
    </template>
  </AudioPlayer>

  <hr class="divider" />

  <div class="flex-grow overflow-hidden grid grid-cols-2">
    <PrimaryFilesList
      :files="files"
      :projectId="projectId"
      @file-uploaded="$emit('changed')"
      v-slot="file"
    >
      <PrimaryFilesListItem
        v-bind="file"
        @click="() => handleSelectFile(file)"
        :class="{ selected: file.sha256 === selectedFile?.sha256 }"
      />
    </PrimaryFilesList>

    <ProjectIssuesList :issues="issues" :project-id="projectId" v-slot="issue">
      <ProjectIssue v-bind="issue" @issue-resolved="() => $emit('changed')" />
    </ProjectIssuesList>
  </div>
</template>
<style lang="css"></style>
