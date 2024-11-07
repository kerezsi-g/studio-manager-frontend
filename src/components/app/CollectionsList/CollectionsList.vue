<script setup lang="ts">
import type { core } from '@/api/api'

import { ListItem } from '@/components/ui/ListItem'

defineProps<{
  data: core.Collection[]
}>()
</script>
<template>
  <div class="panel surface-0">
    <header class="panel-header">Collections</header>
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
  </div>
</template>
<style lang="scss">
.collections-list {
  @apply flex flex-col gap-4 items-start;
  //   @apply px-8 py-4;
  margin-inline: auto;
}
</style>
