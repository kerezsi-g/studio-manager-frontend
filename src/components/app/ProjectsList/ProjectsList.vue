<script setup lang="ts">
import type { types } from '@/api/api'
import ListItem from '@/components/ui/ListItem/ListItem.vue'
import { Panel } from '@/components/ui/Panel'
import dayjs from 'dayjs'

defineProps<{
  title: string
  data: types.Project[]
}>()

// function formatFileSize(bytes: number) {
//   const kb = bytes / 1024
//   //   const mb = kb / 1024

//   return `${kb.toFixed(0)} kB`
// }
</script>
<template>
  <Panel icon="folder" :title>
    <template #body>
      <ul class="asset-list">
        <template v-for="(item, index) in data" :key="index">
          <RouterLink
            :to="{
              name: 'project-page-root',
              params: {
                projectId: item.projectId
              }
            }"
          >
            <ListItem icon="music">
              <h6 class="text-2xl font-light">
                {{ item.projectName }}
              </h6>
              <span class="text-sm opacity-80">
                <strong>Created:</strong> {{ dayjs(item.created).format('YYYY. MMMM D. HH:mm') }}
              </span>
              <span v-if="item.lastModified" class="text-sm opacity-80">
                <strong>Modified:</strong>
                {{ dayjs(item.lastModified).format('YYYY. MMMM D. HH:mm') }}
              </span>
              <template #end>
                <span class="tag">
                  {{ item.fileCount }} files
                  <!-- {{ item.md5.substring(0, 8) }} -->
                </span>
              </template>
            </ListItem>
          </RouterLink>
        </template>
      </ul>
    </template>
  </Panel>
</template>
<style lang="scss">
.asset-list {
  @apply flex flex-col;
  @apply gap-4;
}

.asset-list-item {
  @apply flex items-center;
  @apply gap-6;
  @apply px-4 py-2;
  @apply transition-all;
  @apply border-l border-transparent;

  --color: 255 255 255 cursor: pointer;

  color: rgba(var(--color) / 100%);

  &:hover {
    --color: var(--rgb);
    background-color: rgba(var(--rgb) / 10%);
    border-color: rgba(var(--rgb));
  }

  .filesize {
    @apply text-sm;
    @apply font-mono;
    font-weight: 400;
  }
}

.tag {
  @apply text-white;
  @apply rounded;
  background-color: rgba(var(--rgb) / 40%);
  padding: 4px 12px;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
}
</style>
