<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "collections-list"
}
</route>
<script setup lang="ts">
// import MediaList from '@/components/app/AssetList/AssetList.vue'
import { API } from '@/api/client'
import { CollectionsList } from '@/components/app/CollectionsList'
// import { MediaIndexProvider } from '@/components/data/TracksByProjectId'
import AsyncLoader from '@/components/utility/AsyncLoader/AsyncLoader.vue'

async function get() {
  const response = await API.getCollections()

  return response.data
}
</script>
<template>
  <AsyncLoader :fn="get" :args="{}">
    <template #data="{ data }">
      <CollectionsList :data="data" />
    </template>
  </AsyncLoader>
</template>
<style lang="scss"></style>
