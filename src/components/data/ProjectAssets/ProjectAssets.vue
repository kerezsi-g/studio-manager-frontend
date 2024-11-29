<script setup lang="ts">
import type { core } from '@/api/api'
import { API } from '@/api/client'
import { PendingOverlay } from '@/components/ui'
import { AsyncLoader } from '@/components/utility'

interface Props {
  collectionId: string
}

defineProps<Props>()

async function get({ collectionId }: { collectionId: string }) {
  const res = await API.getProjects(collectionId)

  return res
}
</script>
<template>
  <AsyncLoader
    :fn="get"
    :debounce="600"
    :args="{
      collectionId
    }"
    v-slot="{ data, pending }"
  >
    <slot v-if="data" v-bind="{ collection: data }" />
    <Transition name="fade">
      <PendingOverlay v-if="pending" />
    </Transition>
  </AsyncLoader>
</template>
<style lang="scss"></style>
