<script setup lang="ts">
import type { Issue } from '@/api-client'
import { VDialog } from '../dialog'
import { IssueListItem } from '.'
import SolarIcon from '../SolarIcon.vue'

const props = defineProps<{
  issues: Issue[]
}>()
</script>
<template>
  <VDialog title="Issues" color="info">
    <template #body>
      <ul v-if="issues.length > 0">
        <IssueListItem v-for="issue in issues" :key="issue.issueId" v-bind="issue" />
      </ul>
      <div v-else class="no-data">
        <SolarIcon icon="check-read" class="icon-lg" />
        <p>There are no pending issues</p>
      </div>
    </template>
  </VDialog>
</template>
<style lang="scss"></style>
