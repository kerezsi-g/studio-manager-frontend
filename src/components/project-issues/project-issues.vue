<script setup lang="ts">
import type { Issue } from '@/api-client'
import { VDialog } from '../dialog'
import { IssueListItem } from '.'
import SolarIcon from '../SolarIcon.vue'

defineProps<{
  issues: Issue[]
  projectId: string
}>()

defineEmits<{ (c: 'changed'): void }>()
</script>
<template>
  <VDialog title="Issues" color="info">
    <template #body>
      <ul v-if="issues.length > 0" class="issues-list">
        <IssueListItem
          v-for="issue in issues"
          :key="issue.issueId"
          v-bind="issue"
          :project-id="projectId"
          @issue-resolved="$emit('changed')"
        />
      </ul>
      <div v-else class="no-data-s">
        <SolarIcon icon="check-read" class="icon-lg" />
        <p>There are no pending issues</p>
      </div>
    </template>
  </VDialog>
</template>
<style lang="scss">
.issues-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}

.no-data-s {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}
</style>
