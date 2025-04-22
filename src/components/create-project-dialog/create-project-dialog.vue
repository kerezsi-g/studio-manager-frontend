<script setup lang="ts">
import { API } from '@/api'
import SolarIcon from '../SolarIcon.vue'
import VButton from '../ui/Button/v-button.vue'
import { ref } from 'vue'
import { VTextInput } from '../ui/TextInput'
import { VDialog } from '../dialog'
import { VAlert } from '../alert'
import icons from '@/components/icons'

const props = defineProps<{
  onResolve(projectId: string | null): void
}>()

const projectName = ref('')
const projectType = ref('audio')

async function handleSubmit() {
  const { projectId } = await API.Projects.createProject({
    CreateProjectRequest: {
      projectName: projectName.value,
      projectType: projectType.value,
    },
  })

  props.onResolve(projectId)
}

function handleClose() {
  props.onResolve(null)
}

const options = [
  {
    value: 'audio',
    label: 'Audio',
    icon: icons.projectType.audio,
  },
  {
    value: 'video',
    label: 'Video',
    icon: icons.projectType.video,
  },
  {
    value: 'image',
    label: 'Image',
    icon: icons.projectType.image,
  },
]
</script>
<template>
  <VDialog
    title="Create a New Project"
    color="primary"
    class="padded"
    icon="add-folder"
    subtitle="Create a new project"
  >
    <template #body>
      <VAlert title="Demo feature" color="warning" icon="shield-warning">
        <p>Feature is currently made available only as a part the demo.</p>
        <p>Creating new projects will be an administrator responsibility.</p>
      </VAlert>
      <VTextInput v-model="projectName" placeholder="Project name">
        <template #prefix>
          <SolarIcon icon="file-text" class="icon-base" />
        </template>
      </VTextInput>
      <div class="flex gap-4">
        <label class="project-type-select" v-for="option in options" :key="option.value">
          <input name="project-type" type="radio" :value="option.value" v-model="projectType" />
          <SolarIcon width="32" variant="bold-duotone" :icon="option.icon" />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </template>
    <template #actions>
      <VButton @click="handleClose" variant="outlined">
        Cancel
        <template #suffix>
          <!-- <SolarIcon icon="x" class="icon-base" /> -->
        </template>
      </VButton>
      <VButton :action="handleSubmit">
        Create
        <template #suffix>
          <SolarIcon icon="archive" class="icon-base" />
        </template>
      </VButton>
    </template>
  </VDialog>
</template>
<style lang="css">
@reference "tailwindcss";

.project-type-select {
  @apply transition-all;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
  padding: 1rem;
  border-radius: 3px;
  font-weight: 400;
  font-size: 1.125rem;
  background-color: rgba(0 0 0 / 25%);
}

.project-type-select:hover {
  background-color: rgba(var(--color-main) / 25%);
  color: rgba(var(--color-main));
}

.project-type-select input {
  display: none;
}

.project-type-select:has(input:checked) {
  background-color: rgba(var(--color-main) / 50%);
  color: rgba(var(--color-text));
}
</style>
