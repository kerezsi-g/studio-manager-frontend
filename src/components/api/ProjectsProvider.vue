<script setup lang="ts">
import { API } from '@/api'
import { DataLoader } from '@/components/data-loader'

interface Props {
  collectionId?: string | null
}

withDefaults(defineProps<Props>(), {
  collectionId: null,
})

async function load(args: Props) {
  if (args.collectionId) {
    return await API.Collections.getProjectsInCollection({
      collectionId: args.collectionId,
    })
  } else {
    return await API.Projects.getProjects()
  }
}
</script>
<template>
  <DataLoader :fn="load" :args="{ collectionId }" v-slot="{ data, pending, reload }">
    <slot v-if="data" v-bind="{ data, reload }" />
    <template v-if="pending">
      <!-- Spinner goes here -->
    </template>
  </DataLoader>
</template>
<style lang="scss"></style>
