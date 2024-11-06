<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "projects-list"
}
</route>
<script setup lang="ts">
// import MediaList from '@/components/app/AssetList/AssetList.vue'
import { API } from '@/api/client'
import { ProjectsList } from '@/components/app/ProjectsList'
// import { MediaIndexProvider } from '@/components/data/TracksByProjectId'
import AsyncLoader from '@/components/utility/AsyncLoader/AsyncLoader.vue'

async function getProjects() {
  const response = await API.getProjects()

  return response.data
}
</script>
<template>
  <AsyncLoader :fn="getProjects" :args="{}">
    <template #data="{ data }">
      <ProjectsList :data="data" />
    </template>
  </AsyncLoader>
</template>
<style lang="scss"></style>
