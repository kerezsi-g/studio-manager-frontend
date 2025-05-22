<script setup lang="ts">
import { type Issue, type ProjectDetails, type ProjectAsset, AssetType } from '@/api-client'
import { computed, onMounted, ref } from 'vue'

import ProjectFilesList from '@/components/project-files-list/project-files-list.vue'
import ProjectFilesListItem from '@/components/project-files-list/project-files-list-item.vue'

import AudioPlayer from '@/components/media/audio-player.vue'
import { ProjectIssuesList, ProjectIssue } from '@/components/project-issues'
import { useModal } from '@/components/modal'
import SubmitIssueDialog from '@/components/submit-issue-dialog/submit-issue-dialog.vue'
import TimestampMarker from '@/components/media/components/TimestampMarker.vue'

const props = defineProps<ProjectDetails>()

const selectedAsset = ref<ProjectAsset | null>(null)

const primaryAssets = computed(() => {
  return props.assets.filter((asset) => asset.assetType === AssetType.primary)
})

function handleSelectAsset(asset: ProjectAsset) {
  selectedAsset.value = asset
}

const emit = defineEmits<{
  (c: 'changed'): void
}>()

onMounted(() => {
  if (primaryAssets.value.length > 0) {
    handleSelectAsset(primaryAssets.value[0])
  }
})

const issueToCreate = ref<number | null>()

async function handleSubmitIssue(e: MouseEvent, timestamp?: number, length?: number) {
  issueToCreate.value = timestamp

  const result = await useModal(
    SubmitIssueDialog,
    {
      projectId: props.projectId,
      fileId: selectedAsset.value!.fileId,
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
  return issue.fileId === selectedAsset.value?.fileId
}
</script>
<template>
  <AudioPlayer v-if="selectedAsset" v-bind="selectedAsset" @submit-issue="handleSubmitIssue">
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
      assetType="primary"
      :assets="assets"
      :projectId="projectId"
      @file-uploaded="$emit('changed')"
      v-slot="asset"
    >
      <ProjectFilesListItem
        :data="asset"
        @click="() => handleSelectAsset(asset)"
        :class="{ selected: asset.fileId === selectedAsset?.fileId }"
      />
    </ProjectFilesList>

    <ProjectIssuesList :issues="issues.filter(issueFilter)" :project-id="projectId" v-slot="issue">
      <ProjectIssue v-bind="issue" @issue-resolved="() => $emit('changed')" />
    </ProjectIssuesList>
  </div>
</template>

<style lang="css">
.color-issue {
  --color-main: 185 28 46;
}
</style>
