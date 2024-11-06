<route lang="json">
{
  "props": true
}
</route>
<script setup lang="ts">
import { AudioPlayer } from '@/components/app'
defineProps<{
  fileId: string
}>()
</script>
<template>
  <AudioPlayer v-bind="{ fileId }" />
</template>
<style lang="scss"></style>
