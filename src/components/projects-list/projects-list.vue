<script setup lang="ts">
import type { Project } from '@/api-client'
import { useModal } from '../modal'
import CreateProjectDialog from '../create-project-dialog/create-project-dialog.vue'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '../ui/Button'
import { Icon } from '@iconify/vue/dist/iconify.js'
import dayjs from 'dayjs'
import PageWrapper from '../page-wrapper/page-wrapper.vue'
import ProjectListItem from './project-list-item.vue'

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
  <PageWrapper title="Projects">
    <template #actions>
      <VButton @click="handleCreateProject">
        Create new project
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

.folder-link {
  @apply transition-all;
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgba(var(--color-main) / var(--bg-opacity, 0%));

  cursor: pointer;

  h3 {
    font-size: 1.25rem;
    font-weight: 300;
    text-align: center;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  background-color: rgba(var(--color-main) / var(--bg-opacity, 0%));
}

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
  --width: 240px;
  /* --height: 240px; */
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--width), 1fr));
  place-items: start center;
}

.grid-list-item {
  display: block;
  width: var(--width);
  /* height: 100%; */
}

.grid-list-item:hover {
  color: rgb(var(--color-accent));
  --bg-opacity: 25%;
}
</style>
