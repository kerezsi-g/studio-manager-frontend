<route lang="json">
{
  "name": "file",
  "props": true
}
</route>
<script setup lang="ts">
import { API } from '@/api'
import { DataLoader } from '@/components/data-loader'

interface FileId {
  fileId: string
}

const props = defineProps<FileId>()

async function getPublicAccessUrl({ fileId }: FileId) {
  const { url } = await API.Files.getAccessUrl({
    fileId,
  })
  return url
}
</script>
<template>
  <div class="flex-grow w-full">
    <DataLoader :fn="getPublicAccessUrl" :args="{ fileId: props.fileId }" v-slot="{ data }">
      <template v-if="data">
        <video controls class="w-full" crossorigin="anonymous" :src="data"></video>
      </template>
    </DataLoader>
  </div>
</template>
<style lang="scss"></style>
