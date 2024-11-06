<script setup lang="ts">
import type { core } from '@/api/api'
import { API } from '@/api/client'
import { PendingOverlay } from '@/components/ui'
import { AsyncLoader } from '@/components/utility'

interface Props {
  projectId: string
}

defineProps<Props>()

async function get({ projectId }: { projectId: string }): Promise<core.Asset[]> {
  const res = await API.getAssets(projectId)

  return res.data
}
</script>
<template>
  <AsyncLoader
    :fn="get"
    :debounce="600"
    :args="{
      projectId
    }"
    v-slot="{ data, pending }"
  >
    <slot v-if="data" v-bind="{ data }" />
    <Transition name="fade">
      <PendingOverlay v-if="pending" />
    </Transition>
  </AsyncLoader>
</template>
<style lang="scss"></style>
