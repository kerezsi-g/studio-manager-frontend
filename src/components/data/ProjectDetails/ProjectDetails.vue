<script setup lang="ts">
import { CoreAPI } from '@/api/client'
import { AsyncLoader } from '@/components/utility'

interface Props {
  projectId: string
}

defineProps<Props>()

async function load({ projectId }: { projectId: string }) {
  const { data } = await CoreAPI.getProjectDetails(projectId)

  return data
}
</script>
<template>
  <AsyncLoader :fn="load" :args="{ projectId }">
    <template #data="{ data }">
      <slot v-bind="{ data }" />
    </template>
  </AsyncLoader>
</template>
<style lang="scss"></style>
