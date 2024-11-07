<script setup lang="ts">
import type { core } from '@/api/api'
import { onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import ListItem from '@/components/ui/ListItem/ListItem.vue'

const props = defineProps<{
  title?: string
  projectId: string
  data: core.MediaFile[]
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
  <div id="annotations-list" class="panel surface-0 flex-grow">
    <header class="panel-header">
      <VueFeather type="archive" size="24" strokeWidth="2" />
      <span> Versions </span>
    </header>
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
  </div>
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
