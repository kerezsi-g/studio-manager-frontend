<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "file",
  "props": true
}
</route>
<script setup lang="ts">
import AudioPlayer from '@/components/media/audio-player.vue'

interface FileId {
  sha256: string
}

defineProps<FileId>()
</script>
<template>
  <div class="flex-grow flex flex-col items-center justify-center">
    <AudioPlayer v-bind="{ sha256 }" />
  </div>
</template>
<style lang="scss"></style>
