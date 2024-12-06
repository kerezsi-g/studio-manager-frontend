<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { types } from '@/api/api'
import { useAudioContext } from '../AudioContext/AudioContext.vue'
import { computed } from 'vue'

const props = defineProps<types.Review>()

const ctx = useAudioContext()

const position = computed(() => {
  return (props.t / ctx.duration.value) * 100 + '%'
})
</script>
<template>
  <span class="marker" :style="{ '--position': position }">
    <!-- <p class="marker-text">
      {{ content }}
    </p> -->
  </span>
</template>
<style lang="scss">
.marker {
  position: absolute;
  width: 1px;
  top: 0px;
  bottom: 0px;
  left: var(--position);

  @apply bg-lime-500;
}

.marker-text {
  @apply text-xs;
  @apply bg-lime-500 bg-opacity-25;
  position: absolute;
  //   left: 0;
  //   bottom: 100%;
  user-select: none;
  //   white-space: nowrap;

  padding: 0px 2px;
}
</style>
