<script setup lang="ts">
import SolarIcon from '@/components/SolarIcon.vue'

const playing = defineModel<boolean>('playing', {
  required: true,
})

const loop = defineModel<boolean>('loop', {
  required: true,
})

const emit = defineEmits<{
  (c: 'seek', value: number): void
  (c: 'place-marker', name: string): void
  (c: 'clear-markers'): void
}>()

const iconVariant = 'bold'

// const seek = {
//   forward: [
//     // { value: 5, icon: 'rewind-5-seconds-forward' },
//     { value: 10, icon: 'rewind-10-seconds-forward' },
//     // { value: 15, icon: 'rewind-15-seconds-forward' },
//   ],
//   back: [
//     // { value: -15, icon: 'rewind-15-seconds-back' },
//     { value: -10, icon: 'rewind-10-seconds-back' },
//     // { value: -5, icon: 'rewind-5-seconds-back' },
//   ],
// }

function handlePlay() {
  playing.value = !playing.value
}

function handleToggleLoop() {
  loop.value = !loop.value
}
</script>
<template>
  <nav class="media-controls">
    <!-- <button v-for="item in seek.back" :key="item.value" @click="emit('seek', item.value)">
      <SolarIcon :icon="item.icon" :variant="iconVariant" width="32" />
    </button> -->

    <button @click="emit('seek', -Infinity)">
      <SolarIcon icon="rewind-back" :variant="iconVariant" width="24" />
    </button>

    <button @click="handlePlay">
      <SolarIcon :icon="playing ? 'pause' : 'play'" :variant="iconVariant" width="24" />
    </button>

    <button @click="handleToggleLoop" :class="loop ? 'active' : 'inactive'">
      <SolarIcon icon="repeat" :variant="iconVariant" width="32" />
    </button>

    <button @click="emit('place-marker', 'regionStart')">
      <SolarIcon icon="tag-horizontal" height="20" variant="bold" />
      <span>A</span>
    </button>

    <button @click="emit('place-marker', 'regionEnd')">
      <SolarIcon icon="tag-horizontal" height="20" variant="bold" />
      <span>B</span>
    </button>

    <button @click="emit('clear-markers')">
      <SolarIcon icon="tag-horizontal" height="20" variant="bold" />
      <span>clear</span>
    </button>

    <!-- <button v-for="item in seek.forward" :key="item.value" @click="emit('seek', item.value)">
      <SolarIcon :icon="item.icon" :variant="iconVariant" width="32" />
    </button> -->
  </nav>
</template>
<style>
@reference "tailwindcss";

.media-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;

  /* padding-inline: 64px; */

  --btn-size: 56px;
}

.media-controls button {
  /* padding: 8px; */
  /* width: var(--btn-size); */
  /* height: var(--btn-size); */
  padding-inline: 12px;
  /* height: 100%; */
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 2px;
  font-size: 16px;
  font-weight: 600;

  @apply transition-all;

  &.inactive {
    opacity: 0.5;
  }

  &.active {
    color: rgba(var(--color-main) / 100%);
  }
}

.media-controls button:hover {
  background-color: rgba(var(--color-main) / 15%);
  color: rgba(var(--color-main) / 100%);
}
</style>
