<script setup lang="ts">
import type { ProjectDetails, ProjectAsset } from '@/api-client'
import { computed, onMounted, ref } from 'vue'

import ProjectFilesList from '@/components/project-files-list/project-files-list.vue'
import ProjectFilesListItem from '@/components/project-files-list/project-files-list-item.vue'
import ProjectGallery from '@/components/project-gallery/project-gallery.vue'

const props = defineProps<ProjectDetails>()

const selectedAsset = ref<ProjectAsset | null>(null)

const primaryAssets = computed(() => {
  return props.assets.filter((asset) => asset.tag === 'pending-review')
})

function handleSelectAsset(asset: ProjectAsset) {
  selectedAsset.value = asset
}

const emit = defineEmits<{
  (c: 'changed'): void
}>()

onMounted(() => {
  if (primaryAssets.value.length > 0) {
    handleSelectAsset(primaryAssets.value[0])
  }
})
</script>
<template>
  <ProjectGallery
    assetType="primary"
    :assets="assets"
    :projectId="projectId"
    @file-uploaded="$emit('changed')"
  />
</template>

<style lang="css">
.color-issue {
  --color-main: 185 28 46;
}
</style>
