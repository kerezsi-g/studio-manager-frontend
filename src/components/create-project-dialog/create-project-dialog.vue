<script setup lang="ts">
import { API } from '@/api'
import SolarIcon from '../SolarIcon.vue'
import VButton from '../ui/Button/v-button.vue'
import { ref } from 'vue'
import { VTextInput } from '../ui/TextInput'
import { VDialog } from '../dialog'

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
  <VDialog title="Create a New Project" color="primary">
    <template #body>
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
          <SolarIcon icon="cloud-plus" class="icon-base" />
        </template>
      </VButton>
    </template>
  </VDialog>
</template>
