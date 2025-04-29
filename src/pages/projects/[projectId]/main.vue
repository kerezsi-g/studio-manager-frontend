<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "project-main"
}
</route>
<script lang="ts">
import { useProjectData } from '@/components/api/use-project-data'
/**
 * Re-export is required
 * @see https://uvr.esm.is/data-loaders/organization.html
 */
export { useProjectData }
</script>
<script setup lang="ts">
import { VAlert } from '@/components/alert'

import AudioProject from '@/views/audio-project.vue'

const { data, reload } = useProjectData()
</script>
<template>
  <AudioProject v-if="data?.projectType === 'audio'" v-bind="data" @changed="reload" />

  <div v-if="data?.projectType === 'video'" class="py-16 px-24">
    <VAlert icon="confounded-circle" color="error" title="Unsupported project type">
      User interface for video projects are not supported yet.
    </VAlert>
  </div>

  <div v-if="data?.projectType === 'image'" class="py-16 px-24">
    <VAlert icon="confounded-circle" color="error" title="Unsupported project type">
      User interface for photography projects are not supported yet.
    </VAlert>
  </div>
</template>
<style lang="scss"></style>
