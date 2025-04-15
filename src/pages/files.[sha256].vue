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
  sha256: string
}

defineProps<FileId>()

async function getPublicAccessUrl({ sha256 }: FileId) {
  const { url } = await API.Files.getAccessUrl({ sha256 })

  return url
}
</script>
<template>
  <div class="flex-grow w-full">
    <DataLoader :fn="getPublicAccessUrl" :args="{ sha256 }" v-slot="{ data }">
      <template v-if="data">
        <div class="flex items-center justify-center">
          <video controls crossorigin="anonymous" :src="data"></video>
        </div>
      </template>
    </DataLoader>
  </div>
</template>
<style lang="scss"></style>
