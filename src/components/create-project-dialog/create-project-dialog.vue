<script setup lang="ts">
import { API } from '@/api'
import SolarIcon from '../SolarIcon.vue'
import VButton from '../ui/Button/v-button.vue'
import { ref } from 'vue'
import { VTextInput } from '../ui/TextInput'
import { VDialog } from '../dialog'
import { VAlert } from '../alert'

const props = defineProps<{
  onResolve(projectId: string | null): void
}>()

const projectName = ref('')

async function handleSubmit() {
  const { projectId } = await API.Projects.createProject({
    CreateProjectRequest: {
      projectName: projectName.value,
      projectType: '',
    },
  })

  props.onResolve(projectId)
}

function handleClose() {
  props.onResolve(null)
}
</script>
<template>
  <VDialog title="Create a New Project" color="primary" class="padded">
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
