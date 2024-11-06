<script setup lang="ts">
import type { core } from '@/api/api'
import dayjs from 'dayjs'

defineProps<{
  data: core.Asset[]
}>()

// function formatFileSize(bytes: number) {
//   const kb = bytes / 1024
//   //   const mb = kb / 1024

//   return `${kb.toFixed(0)} kB`
// }
</script>
<template>
  <div class="panel surface-0">
    <header class="panel-header">Assets</header>
    <ul class="asset-list">
      <template v-for="(item, index) in data" :key="index">
        <RouterLink
          :to="{
            name: 'view-asset',
            params: {
              assetId: item.assetId
            }
          }"
        >
          <li class="asset-list-item">
            <VueFeather type="music" size="24" strokeWidth="1.5" />
            <div class="flex flex-col flex-grow mr-8 gap-1">
              <h6 class="text-2xl font-light">
                {{ item.assetName }}
              </h6>
              <span class="text-sm opacity-80">
                <strong>Created:</strong> {{ dayjs(item.created).format('YYYY. MMMM D. HH:mm') }}
              </span>
              <span v-if="item.lastModified" class="text-sm opacity-80">
                <strong>Modified:</strong>
                {{ dayjs(item.lastModified).format('YYYY. MMMM D. HH:mm') }}
              </span>
            </div>
            <!-- <span class="filesize"> -->
            <!-- {{ formatFileSize(item.size) }} -->
            <!-- </span> -->
            <span class="tag">
              {{ item.fileCount }} files
              <!-- {{ item.md5.substring(0, 8) }} -->
            </span>
          </li>
        </RouterLink>
      </template>
    </ul>
  </div>
</template>
<style lang="scss">
.asset-list {
  @apply flex flex-col;
  @apply gap-4;
  //   @apply px-8 py-4;
  margin-inline: auto;
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
  @apply text-sm;
  @apply text-white;
  @apply rounded;
  background-color: rgba(var(--rgb) / 40%);
  padding: 0px 8px;
  font-weight: 300;
  letter-spacing: 1px;
}
</style>
