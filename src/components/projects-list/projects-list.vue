<i18n lang="json">
{
  "en": {
    "no-data": "No Projects found",
    "create-project": "Create new project",
    "title": "Projects"
  }
}
</i18n>
<script setup lang="ts">
import type { Project } from '@/api-client'
import { useModal } from '../modal'
import CreateProjectDialog from '../create-project-dialog/create-project-dialog.vue'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '../ui/Button'
import { useI18n } from 'vue-i18n'

import PageWrapper from '../page-wrapper/page-wrapper.vue'
import ProjectListItem from './project-list-item.vue'

const { t } = useI18n()

defineProps<{
  projects: Project[]
}>()

const emit = defineEmits<{
  (c: 'projectCreated', projectId: string): void
}>()

async function handleCreateProject(e?: MouseEvent) {
  const result = await useModal(CreateProjectDialog, {}, { e })

  if (result) {
    emit('projectCreated', result)
  }
}
</script>
<template>
  <PageWrapper :title="t('title')">
    <template #actions>
      <VButton @click="handleCreateProject">
        {{ t('create-project') }}
        <template #suffix>
          <SolarIcon icon="add-circle" class="icon-base" />
        </template>
      </VButton>
    </template>
    <template #body>
      <ul v-if="projects.length > 0" class="grid-list" v-auto-animate>
        <ProjectListItem v-for="project in projects" :key="project.projectId" v-bind="project" />
      </ul>
      <div v-else class="no-data">No Projects found</div>
    </template>
  </PageWrapper>
</template>
<style lang="css">
@reference 'tailwindcss';

.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 3rem;
  font-weight: 100;
  opacity: 0.5;
}

.grid-list {
  --width: 320px;
  /* --height: 240px; */
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--width), 1fr));
  place-items: start center;
}
</style>
