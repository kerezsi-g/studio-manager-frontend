<script setup lang="ts">
import type { core } from '@/api/api'
import { computed } from 'vue'
import { useWaveformSvg } from './components/useWaveformSvg'

const props = defineProps<{
  bits: number
  length: number
  peaks: number[]
}>()

const svgPath = computed(() => {
  return useWaveformSvg(props)
})
</script>
<template>
  <svg
    :viewBox="`0 ${-(2 ** bits / 2)} ${length} ${2 ** bits}`"
    class="waveform"
    preserveAspectRatio="none"
  >
    <path :d="svgPath" class="waveform-path" />
  </svg>
</template>
<style lang="scss">
.waveform {
  height: var(--ch-height, 256px);
  width: 100%;

  padding-block: 4px;

  background: rgba(0 0 0 / 90%);
}

.waveform-path {
  @apply transition-all;
  //   stroke: rgb(var(--rgb));
  //   stroke-opacity: 0%;
  fill: rgb(var(--rgb));
  fill-opacity: 80%;
}
</style>
