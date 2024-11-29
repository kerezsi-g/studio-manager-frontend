<script setup lang="ts">
import type { core } from '@/api/api'

import { ListItem } from '@/components/ui/ListItem'
import { Panel } from '@/components/ui/Panel'

defineProps<{
  data: core.Collection[]
}>()
</script>
<template>
  <Panel title="Collections" icon="database" class="collections-list-root">
    <template #body>
      <ul class="collections-list">
        <template v-for="(collection, i) in data" :key="i">
          <RouterLink
            :to="{
              name: 'list-projects',
              params: {
                collectionId: collection.collectionId
              }
            }"
          >
            <ListItem icon="folder">
              <h6>
                {{ collection.collectionName }}
              </h6>
              <span class="opacity-80"> Projects: {{ collection.projectCount }} </span>
            </ListItem>
          </RouterLink>
        </template>
      </ul>
    </template>
  </Panel>
</template>
<style lang="scss">
.collections-list-root {
  width: 100%;
  height: 100%;
}

.collections-list {
  @apply flex flex-col gap-4 items-stretch;
  //   @apply px-8 py-4;
  //   margin-inline: auto;
}
</style>
