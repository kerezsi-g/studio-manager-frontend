<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "list-projects",
  "props": true
}
</route>
<script setup lang="ts">
import { ProjectAssets } from '@/components/data'
import { ProjectsList } from '@/components/app'

interface Props {
  collectionId: string
}

defineProps<Props>()
</script>
<template>
  <ProjectAssets v-slot="{ data }" v-bind="{ collectionId }">
    <ProjectsList :data="data" />
  </ProjectAssets>
</template>
<style lang="scss"></style>
