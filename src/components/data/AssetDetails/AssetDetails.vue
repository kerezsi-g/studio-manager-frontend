<script setup lang="ts">
import { API } from '@/api/client'
import { AsyncLoader } from '@/components/utility'

interface Props {
  assetId: string
}

defineProps<Props>()

async function load({ assetId }: { assetId: string }) {
  const { data } = await API.getAssetDetails(assetId)

  return data
}
</script>
<template>
  <AsyncLoader :fn="load" :args="{ assetId }">
    <template #data="{ data }">
      <slot v-bind="{ data }" />
    </template>
  </AsyncLoader>
</template>
<style lang="scss"></style>
