<script setup lang="ts">
import { API } from '@/api'
import { DataLoader } from '@/components/data-loader'

async function load() {
  const result = await API.Collections.getCollections()
  return result
}
</script>
<template>
  <DataLoader :fn="load" :args="{}" v-slot="{ data, pending, reload }">
    <slot v-if="data" v-bind="{ data, reload }" />
    <template v-if="pending"> </template>
  </DataLoader>
</template>

<style lang="scss"></style>
