<script setup lang="ts">
import SolarIcon from '@/components/SolarIcon.vue'
import { computed } from 'vue'

const muted = defineModel<boolean>('muted')

const volume = defineModel<number>('volume', {
  required: true,
})

const volumeIcon = computed(() => {
  if (muted.value) {
    return 'volume-cross'
  }
  if (volume.value > 0.5) {
    return 'volume-loud'
  } else {
    return 'volume-small'
  }
})

function handleMute() {
  muted.value = !muted.value
}
</script>
<template>
  <div class="media-volume-ctrl">
    <button @click="handleMute" :style="{ opacity: muted ? 0.5 : 1 }">
      <SolarIcon width="32" :icon="volumeIcon" variant="line-duotone" />
    </button>

    <span class="flex flex-col relative">
      <input type="range" v-model="volume" min="0" max="1" step="0.02" class="volume-slider" />
    </span>
    <span class="font-mono text-center text-xs font-light" style="width: 4ch">
      {{ (volume * 100).toFixed(0) }}%
    </span>
  </div>
</template>
<style lang="scss">
.media-volume-ctrl {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-inline: 12px;
  padding-block: 8px;
}

.volume-slider {
  --size: 6px;

  width: 240px;
  height: var(--size);

  border-radius: 8px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  outline: none;

  cursor: pointer;

  background-color: rgba(var(--color-main) / 25%);

  box-shadow: 0 0 0 1px rgba(var(--color-main) / 50%);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 2);
    border-radius: 50%;
    // margin-top: -6px;
    background-color: rgba(var(--color-main) / 100%);

    // box-shadow: 0 0 0 2px rgba(var(--color-main) / 50%);
  }
}
</style>
