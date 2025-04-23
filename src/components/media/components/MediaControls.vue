<script setup lang="ts">
import SolarIcon from '@/components/SolarIcon.vue'

const playing = defineModel<boolean>('playing', {
  required: true,
})

const emit = defineEmits<{
  (c: 'seek', value: number): void
}>()

const iconVariant = 'bold-duotone'

const seek = {
  forward: [
    { value: 5, icon: 'rewind-5-seconds-forward' },
    { value: 10, icon: 'rewind-10-seconds-forward' },
    { value: 15, icon: 'rewind-15-seconds-forward' },
  ],
  back: [
    { value: -15, icon: 'rewind-15-seconds-back' },
    { value: -10, icon: 'rewind-10-seconds-back' },
    { value: -5, icon: 'rewind-5-seconds-back' },
  ],
}

function handlePlay() {
  playing.value = !playing.value
}
</script>
<template>
  <nav class="media-controls">
    <button v-for="item in seek.back" :key="item.value" @click="emit('seek', item.value)">
      <SolarIcon :icon="item.icon" :variant="iconVariant" width="32" />
    </button>

    <button @click="handlePlay">
      <SolarIcon
        :icon="playing ? 'pause-circle' : 'play-circle'"
        :variant="iconVariant"
        width="48"
      />
    </button>

    <button v-for="item in seek.forward" :key="item.value" @click="emit('seek', item.value)">
      <SolarIcon :icon="item.icon" :variant="iconVariant" width="32" />
    </button>
  </nav>
</template>
<style>
@reference "tailwindcss";

.media-controls {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0 0 0 / 90%);
  padding-inline: 64px;

  --btn-size: 64px;
}

.media-controls button {
  /* padding: 8px; */
  width: var(--btn-size);
  height: var(--btn-size);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @apply transition-all;
}

.media-controls button:hover {
  background-color: rgba(var(--color-main) / 75%);
}
</style>
