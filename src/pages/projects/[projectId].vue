<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "view-project",
  "props": true
}
</route>
<script setup lang="ts">
import { ProjectAssets } from '@/components/data'
import { AssetList } from '@/components/app'

interface Props {
  projectId: string
}

defineProps<Props>()
</script>
<template>
  <ProjectAssets v-slot="{ data }" :project-id>
    <AssetList :data="data" />
  </ProjectAssets>
</template>
<style lang="scss"></style>
