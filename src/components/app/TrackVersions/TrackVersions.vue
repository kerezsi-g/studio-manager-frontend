<script setup lang="ts">
import type { core } from '@/api/api'
import { onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const props = defineProps<{
  title?: string
  assetId: string
  data: core.MediaFile[]
}>()

onMounted(() => {
  const router = useRouter()
  const route = useRoute()

  if (props.data.length == 0) return

  if (props.data.some((obj) => obj.fileId === route.params.fileId)) return

  router.replace({
    name: 'view-asset',
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
          name: 'view-asset',
          params: { itemId: file.itemId, fileId: file.fileId }
        }"
      >
        <li class="list-item">
          <VueFeather type="file" size="24" strokeWidth="2" />
          <strong>{{ dayjs(file.created).format('YYYY-MM-DD HH:mm') }}</strong>
        </li>
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

.router-link-exact-active > .list-item {
  color: rgba(var(--rgb) / 100%);
  background-color: rgba(var(--rgb) / 10%);
  border-left: 1px solid rgba(var(--rgb) / 100%);
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
