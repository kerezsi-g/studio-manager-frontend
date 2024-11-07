<script setup lang="ts">
import type { core } from '@/api/api'
import { useAudioContext } from '../AudioContext/AudioContext.vue'
import { computed } from 'vue'

const props = defineProps<core.Review>()

const ctx = useAudioContext()

const position = computed(() => {
  return (props.t / ctx.duration.value) * 100 + '%'
})
</script>
<template>
  <span class="marker" :style="{ '--position': position }" />
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
</style>
