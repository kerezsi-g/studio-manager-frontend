<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import { getContentSizeStatistics } from './calculate-stats'
import { computed } from 'vue'
import { formatBytes } from './format-file-size'

const props = defineProps<{
  assets: ProjectAsset[]
}>()

const stats = computed(() => {
  return getContentSizeStatistics(props.assets)
})
</script>
<template>
  <main class="asset-statistics">
    <h1>Storage statistics</h1>
    <hr class="divider" />
    <section v-for="rootType in stats.contentTypes" :key="rootType.type" class="pl-2">
      <header class="flex items-center gap-1">
        <strong> {{ rootType.type }}:</strong>
        <span>
          {{ formatBytes(rootType.totalSize) }}
        </span>
      </header>
      <ul>
        <li v-for="subType in rootType.subTypes" :key="subType.type" class="pl-4 text-sm">
          {{ subType.type }}: {{ formatBytes(subType.size) }}
        </li>
      </ul>
    </section>
    <footer>
      <strong>Total:</strong>
      <span>{{ formatBytes(stats.totalSize) }}</span>
    </footer>
  </main>
</template>
<style lang="css">
.asset-statistics {
  background-color: rgba(var(--surface-dark) / 50%);
  padding: 1rem 2rem;

  gap: 4rem;

  h1 {
    font-weight: 600;
    font-size: 1.5rem;
  }

  footer {
    font-size: 1.25rem;
    font-weight: 500;
    display: flex;
    gap: 4px;
  }
}
</style>
