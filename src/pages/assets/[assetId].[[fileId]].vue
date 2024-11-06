<route lang="json">
{
  "props": true,
  "name": "view-asset"
}
</route>
<script setup lang="ts">
import AudioPlayer from '@/components/app/AudioPlayer/AudioPlayer.vue'
import ReviewsList from '@/components/app/Reviews/Reviews.vue'
import { Reviews } from '@/components/data/Reviews'
import TrackVersions from '@/components/app/TrackVersions/TrackVersions.vue'

import { AssetDetails } from '@/components/data'

defineProps<{
  assetId: string
  fileId?: string
}>()
</script>
<template>
  <div class="asset-page">
    <AssetDetails v-bind="{ assetId }" v-slot="{ data }">
      <aside class="flex flex-col">
        <header class="asset-page-header">
          <h1>{{ data.assetName }}</h1>
          <h2>Parent project: {{ data.projectName }}</h2>
        </header>
        <TrackVersions v-bind="{ assetId }" :data="data.versions" />
      </aside>
      <main class="flex-grow flex flex-col items-stretch">
        <AudioPlayer :file-id="fileId" :annotations="[]" v-if="fileId" />
        <Reviews v-slot="{ data }" v-bind="{ assetId }">
          <ReviewsList :data="data" />
        </Reviews>
      </main>
    </AssetDetails>
  </div>
</template>
<style lang="scss">
.asset-page {
  width: 100%;
  height: 100;
  flex-grow: 1;

  display: flex;
  flex-direction: row;

  @apply bg-black bg-opacity-50;
}

.asset-page-header {
  //   height: 128px;
  @apply px-8 py-2;
  @apply self-stretch;
  @apply bg-black bg-opacity-50;

  h1 {
    @apply text-4xl;
    // @apply border-b;
    font-weight: 300;
  }

  h2 {
    @apply text-xl;
    @apply ml-2;
    color: rgba(var(--rgb) / 100%);
    opacity: 0.8;
  }
}
</style>
