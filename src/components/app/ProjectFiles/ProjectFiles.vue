<script setup lang="ts">
import type { types } from '@/api/api'
import { onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import ListItem from '@/components/ui/ListItem/ListItem.vue'
import { Panel } from '@/components/ui/Panel'

const props = defineProps<{
  title?: string
  projectId: string
  data: types.MediaFile[]
}>()

onMounted(() => {
  const router = useRouter()
  const route = useRoute()

  if (props.data.length == 0) return

  if (props.data.some((obj) => obj.fileId === route.params.fileId)) return

  router.replace({
    name: 'project-page-root',
    params: {
      fileId: props.data[0].fileId
    }
  })
})
</script>
<template>
  <Panel title="Versions" icon="archive" class="flex-grow">
    <template #body>
      <ul class="versions-list">
        <RouterLink
          v-for="file in data"
          :key="file.fileId"
          :to="{
            name: 'project-page-root',
            params: { projectId: file.projectId, fileId: file.fileId }
          }"
        >
          <ListItem icon="file">
            <strong>{{ dayjs(file.created).format('YYYY-MM-DD HH:mm') }}</strong>
          </ListItem>
        </RouterLink>
      </ul>
    </template>
  </Panel>
</template>
<style lang="scss">
.versions-list {
  @apply flex flex-col;
  @apply gap-2;
}

//TODO: Extract
.list-item {
  @apply flex items-center;
  @apply px-4 py-2 gap-4;
  @apply text-xl;

  font-weight: 300;
}

.view-track-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: start;

  @apply bg-stone-800;
  @apply px-8 py-4;
  //   background-color: rgba(var(--rgb));

  h1 {
    @apply text-3xl;
    @apply border-b;
  }

  nav {
    @apply flex flex-row gap-4;
  }
}
</style>
