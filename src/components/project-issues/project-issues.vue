<script setup lang="ts">
import type { Issue } from '@/api-client'
import ListItem from './project-issues-list-item.vue'
import SolarIcon from '../SolarIcon.vue'
import { VList } from '../ui/List'
import { computed } from 'vue'

const props = defineProps<{
  issues: Issue[]
  projectId: string
}>()

defineEmits<{ (c: 'changed'): void }>()

const pending = computed(() => {
  return props.issues.filter((issue) => !issue.resolvedAt)
})

const resolved = computed(() => {
  return props.issues.filter((issue) => issue.resolvedAt)
})

const sorted = computed(() => {
  return [...pending.value, ...resolved.value]
})
</script>
<template>
  <VList title="Issues:">
    <template #items v-if="sorted.length > 0">
      <slot v-for="issue in sorted" :key="issue.issueId" v-bind="issue" :project-id="projectId">
        <ListItem v-bind="issue" :project-id="projectId" @issue-resolved="$emit('changed')" />
      </slot>
    </template>
    <template #items v-else>
      <div class="no-data-s">
        <SolarIcon icon="check-read" class="icon-lg" />
        <p>There are no pending issues</p>
      </div>
    </template>
  </VList>
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
