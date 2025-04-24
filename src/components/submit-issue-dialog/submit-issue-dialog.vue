<script setup lang="ts">
import { API } from '@/api'
import { VDialog } from '../dialog'
import { VTextInput } from '../ui/TextInput'
import { VButton } from '../ui/Button'
import SolarIcon from '../SolarIcon.vue'
import { ref } from 'vue'

const props = defineProps<{
  projectId: string
  sha256: string
  onResolve(result: string | null): void
  timestamp?: number
  duration?: number
}>()

const issueText = ref('')

async function handleSubmit() {
  const { issueId } = await API.Projects.createIssue({
    projectId: props.projectId,
    CreateIssueRequest: {
      file: props.sha256,
      description: issueText.value,
      timestamp: props.timestamp,
      duration: props.duration,
    },
  })

  props.onResolve(issueId)
}

function handleClose() {
  props.onResolve(null)
}
</script>
<template>
  <VDialog
    title="Submit Issue"
    color="info"
    class="padded"
    icon="chat-round-dots"
    subtitle="Submit an issue for the project"
  >
    <template #body>
      <VTextInput v-model="issueText" placeholder="Issue description">
        <!-- <template #prefix>
          <SolarIcon icon="file-text" class="icon-base" />
        </template> -->
      </VTextInput>
    </template>
    <template #actions>
      <VButton @click="handleClose" variant="outlined"> Cancel </VButton>
      <VButton :action="handleSubmit"> Submit </VButton>
    </template>
  </VDialog>
</template>
<style lang="scss"></style>
