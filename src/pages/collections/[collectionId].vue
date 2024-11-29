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
  <ProjectAssets v-slot="{ collection }" v-bind="{ collectionId }">
    <ProjectsList :data="collection.data" :title="collection.collectionName" class="flex-grow" />
  </ProjectAssets>
</template>
<style lang="scss"></style>
