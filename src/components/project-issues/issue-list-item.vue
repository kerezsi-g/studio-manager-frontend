<script setup lang="ts">
import type { Issue } from '@/api-client'

import { computed } from 'vue'
import dayjs from 'dayjs'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { API } from '@/api'

const props = defineProps<Issue & { projectId: string }>()

const emit = defineEmits<{ (c: 'issue-resolved'): void }>()

const id = computed(() => props.issueId.slice(0, 8))

const created = computed(() => dayjs(props.createdAt).format('YYYY-MM-DD HH:mm'))

const status = computed(() => {
  if (props.resolvedAt) {
    return 'resolved'
  } else {
    return 'open'
  }
})

const fileId = computed(() => props.file.slice(0, 16))

async function handleResolveIssue() {
  await API.Projects.resolveIssue({
    projectId: props.projectId,
    issueId: props.issueId,
  })

  emit('issue-resolved')
}
</script>
<template>
  <div
    :title="created"
    class="issue"
    :class="{
      'palette-error': status == 'open',
      'palette-success': status == 'resolved',
    }"
    v-auto-animate
  >
    <header class="issue-header">
      <SolarIcon
        :icon="status === 'open' ? 'danger' : 'check-circle'"
        variant="bold-duotone"
        class="issue-icon"
      />
      <h3 class="issue-title">
        <span class="title">
          {{ created }}
        </span>
        <span class="file-id"> File: {{ fileId }} </span>
      </h3>
      <span class="issue-id"> #{{ id }} </span>
    </header>
    <p class="issue-description">
      {{ description }}
    </p>
    <VButton
      v-if="status === 'open'"
      @click="handleResolveIssue"
      class="sm"
      variant="subdued"
      color="success"
    >
      Resolve
      <template #suffix>
        <SolarIcon icon="check-circle" class="icon-sm" variant="line-duotone" />
      </template>
    </VButton>
  </div>
</template>
<style lang="css">
@reference "tailwindcss";

.issue {
  @apply transition-all;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-left: 6px solid rgba(var(--color-main) / 100%);
  background-color: rgba(var(--color-main) / 20%);
  border-radius: 2px;

  padding: 0.5rem 1.5rem;

  background-image: linear-gradient(
    135deg,
    rgba(var(--color-main) / 5%) 25%,
    transparent 25%,
    transparent 50%,
    rgba(var(--color-main) / 5%) 50%,
    rgba(var(--color-main) / 5%) 75%,
    transparent 75%,
    transparent 100%
  );
  background-size: 19.8px 19.8px;
}

.issue-header {
  display: flex;
  align-items: center;
  gap: 1rem;

  .issue-title {
    font-size: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    line-height: normal;

    .file-id {
      opacity: 0.5;
      font-size: 12px;
      font-family: 'Roboto Mono';
    }
  }

  .issue-icon {
    font-size: 24px;
    color: rgba(var(--color-main));
  }

  .issue-id {
    font-family: 'Roboto Mono';
    font-size: 10px;
    opacity: 0.85;
  }
}

.issue-description {
  width: fit-content;
  font-size: 14px;
}
</style>
