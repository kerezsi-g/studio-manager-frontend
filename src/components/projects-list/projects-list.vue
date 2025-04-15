<script setup lang="ts">
import type { Project } from '@/api-client'
import { useModal } from '../modal'
import CreateProjectDialog from '../create-project-dialog/create-project-dialog.vue'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '../ui/Button'
import { Icon } from '@iconify/vue/dist/iconify.js'
import dayjs from 'dayjs'

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
  <section class="folder-list">
    <header>
      <h3>Projects</h3>
      <VButton @click="handleCreateProject">
        Create new project
        <template #suffix>
          <SolarIcon icon="add-circle" class="icon-base" />
        </template>
      </VButton>
    </header>
    <hr />

    <template v-if="projects.length > 0">
      <ul class="grid-list" v-auto-animate>
        <li v-for="project in projects" :key="project.projectId" class="grid-list-item">
          <router-link
            :to="{
              name: 'project',
              params: {
                projectId: project.projectId,
              },
            }"
            class="folder-link"
          >
            <span>
              <Icon icon="fxemoji:folder" width="96" />
            </span>
            <h4>
              <SolarIcon icon="calendar-minimalistic" class="icon-sm" />
              {{ dayjs(project.createdAt).format('YYYY-MM-DD') }}
            </h4>
            <h3>{{ project.projectName }}</h3>
          </router-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="no-data">No Projects found</div>
    </template>
  </section>
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
  justify-content: center;
  align-items: center;
  padding: 1rem 4rem;
  font-size: 4rem;
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

.folder-list {
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  hr {
    opacity: 0.3;
  }

  header {
    display: flex;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4rem;
    padding: 1rem 4rem;

    h3 {
      font-size: 2rem;
      flex-grow: 1;
    }
  }

  div {
    flex-grow: 1;
  }
}
</style>
