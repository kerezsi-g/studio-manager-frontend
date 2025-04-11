<script setup lang="ts">
import { API } from '@/api'
import { DataLoader } from '../data-loader'

const props = defineProps<{
  projectId: string
}>()

async function load({ projectId }: { projectId: string }) {
  return await API.Projects.getProjectDetails({ projectId })
}
</script>
<template>
  <DataLoader :fn="load" :args="{ projectId }" v-slot="{ data, pending, reload }">
    <slot v-if="data" v-bind="{ data, reload }" />
    <template v-if="pending">
      <!-- Spinner goes here -->
    </template>
  </DataLoader>
</template>
<style lang="scss"></style>
