<script setup lang="ts">
import { ref } from 'vue'
import { VDialog } from '../dialog'
import { VTextInput } from '../ui/TextInput'
import { VButton } from '../ui/Button'
import { API } from '@/api'

const props = defineProps<{
  projectId: string
  currentName: string
  onResolve: (name: string | null) => void
}>()

const newName = ref('')

async function handleSubmit() {
  if (newName.value) {
    await API.Projects.updateProject({
      projectId: props.projectId,
      UpdateProjectRequest: {
        projectName: newName.value,
      },
    })

    props.onResolve(newName.value)
  }
}

async function handleClose() {
  props.onResolve(null)
}
</script>
<template>
  <VDialog title="Rename Project" color="info">
    <template #body>
      <VTextInput :model-value="currentName" readonly>
        <template #prefix> <span class="text-sm opacity-90">Current name:</span> </template>
      </VTextInput>
      <VTextInput v-model="newName" placeholder="New project name">
        <template #prefix> <span class="text-sm opacity-90">New name:</span> </template>
      </VTextInput>
    </template>
    <template #actions>
      <VButton @click="handleClose" variant="outlined"> Cancel </VButton>
      <VButton :action="handleSubmit" :disabled="!newName"> Rename </VButton>
    </template>
  </VDialog>
</template>
<style lang="scss"></style>
