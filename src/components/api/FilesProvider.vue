<script setup lang="ts">
import { API } from '@/api'
import { DataLoader } from '@/components/data-loader'

interface Props {
  projectId: string
}

defineProps<Props>()

async function load({ projectId }: Props) {
  return await API.Projects.getProjectFiles({ projectId })
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
