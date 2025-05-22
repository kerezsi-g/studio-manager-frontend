<script setup lang="ts">
import type { ProjectAsset } from '@/api-client'
import SolarIcon from '@/components/SolarIcon.vue'

defineProps<ProjectAsset>()
</script>
<template>
  <header class="media-player-info">
    <SolarIcon icon="music-note" variant="bold-duotone" width="24" />
    <div class="media-player-title">
      <h1>{{ assetName }}</h1>
      <h2>{{ contentType }}</h2>
    </div>
  </header>
</template>
<style lang="css">
.media-player-info {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  padding-inline: 1rem;
  gap: 1rem;
}

.media-player-title {
  display: flex;
  flex-direction: column;
  line-height: normal;

  & > h1 {
    font-size: 18px;
  }

  & > h2 {
    font-size: 14px;
    opacity: 0.75;
  }
}
</style>
