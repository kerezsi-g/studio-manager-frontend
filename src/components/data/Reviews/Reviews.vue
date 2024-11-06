<script setup lang="ts">
import { API } from '@/api/client'
import { PendingOverlay } from '@/components/ui'
import { AsyncLoader } from '@/components/utility'

interface Props {
  assetId: string
}

defineProps<Props>()

async function get({ assetId }: { assetId: string }) {
  const res = await API.getAnnotations(assetId)

  return res.data
}
</script>
<template>
  <AsyncLoader
    :fn="get"
    :debounce="600"
    :args="{
      assetId
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
