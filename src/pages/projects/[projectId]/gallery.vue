<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "project-gallery"
}
</route>
<script lang="ts">
import { useProjectData } from '@/components/api/use-project-data'
import ProjectGallery from '@/components/project-gallery/project-gallery.vue'
/**
 * Re-export is required
 * @see https://uvr.esm.is/data-loaders/organization.html
 */
export { useProjectData }
</script>
<script setup lang="ts">
const { data, reload } = useProjectData()

defineProps<{
  projectId: string
}>()
</script>
<template>
  <ProjectGallery
    v-if="data"
    :files="data.files"
    :projectId="data.projectId"
    @file-uploaded="reload"
  />
</template>
<style lang="scss"></style>
