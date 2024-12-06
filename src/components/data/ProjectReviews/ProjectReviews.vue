<script setup lang="ts">
import { CoreAPI } from '@/api/client'

import { PendingOverlay } from '@/components/ui'
import { AsyncLoader } from '@/components/utility'

interface Props {
  projectId: string
}

defineProps<Props>()

async function get({ projectId }: { projectId: string }) {
  const res = await CoreAPI.getReviews(projectId)

  return res.data
}
</script>
<template>
  <AsyncLoader :fn="get" :debounce="600" :args="{ projectId }" v-slot="{ data, pending, reload }">
    <slot v-if="data" v-bind="{ data, reload }" />
    <Transition name="fade">
      <PendingOverlay v-if="pending" />
    </Transition>
  </AsyncLoader>
</template>
<style lang="scss"></style>
