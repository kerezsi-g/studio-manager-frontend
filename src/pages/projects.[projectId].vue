<route lang="json">
{
  "name": "project",
  "props": true
}
</route>
<script setup lang="ts">
import ProjectDetailsProvider from '@/components/api/ProjectDetailsProvider.vue'
import { useModal } from '@/components/modal'
import { VButton } from '@/components/ui/Button'
import UploadFileDialog from '@/components/upload-file-dialog/upload-file-dialog.vue'

const props = defineProps<{
  projectId: string
}>()

async function handleAddFile() {
  const result = await useModal(UploadFileDialog, {
    projectId: props.projectId,
  })
}
</script>
<template>
  <ProjectDetailsProvider :projectId="projectId" v-slot="{ data }">
    {{ data }}

    <ul>
      <li v-for="file in data.files" :key="file.fileId">
        <router-link :to="{ name: 'file', params: { fileId: file.fileId } }">
          {{ file.fileId }} |
          {{ file.fileName }}
        </router-link>
      </li>
    </ul>

    <VButton @click="handleAddFile">Add File</VButton>
  </ProjectDetailsProvider>
</template>
<style lang="scss"></style>
