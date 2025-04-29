<route lang="json">
{
  "name": "project-root",
  "props": true
}
</route>
<script lang="ts">
import { useProjectData } from '@/components/api/use-project-data'
/**
 * Re-export is required
 * @see https://uvr.esm.is/data-loaders/organization.html
 */
export { useProjectData }
</script>
<script setup lang="ts">
import ProjectPage from '@/components/project-page/project-page.vue'
// import { onMounted } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

// const props = defineProps<{
//   projectId: string
// }>()

// onMounted(() => {
//   if (useRoute().name === 'project-root') {
//   }

//   useRouter().replace({ name: 'project-main', params: { projectId: props.projectId } })
// })

// const { isLoading } = useProjectData()
</script>
<template>
  <ProjectPage>
    <RouterView />
  </ProjectPage>
</template>
<style lang="scss">
#project-root {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  & > header {
    font-size: 2rem;
    font-weight: 300;
    padding: 1rem 4rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    background-color: rgba(0 0 0 / 80%);
  }
}
</style>
