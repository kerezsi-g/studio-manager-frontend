<script setup lang="ts">
import { computed } from 'vue'
import { peaksToSvgPath } from './peaks-to-svg-path'

const props = defineProps<{
  peaks: number[][]
  bits: number
  channels: number
  length: number
}>()

const paths = computed(() =>
  props.peaks.map((peaks) =>
    peaksToSvgPath({
      bits: props.bits,
      peaks,
      length: props.length,
    }),
  ),
)

const viewBox = computed(() => {
  return [0, -(2 ** props.bits / 2), props.length, 2 ** props.bits]
})
</script>
<template>
  <div class="audio-waveform">
    <div v-for="(path, index) in paths" :key="index" class="waveform-container">
      <span class="channel-label"> Channel {{ index + 1 }} </span>
      <svg :viewBox="viewBox.join(' ')" class="waveform" preserveAspectRatio="none" :key="index">
        <path :d="path" class="waveform-path" />
      </svg>
    </div>
  </div>
</template>
<style lang="css">
@reference "tailwindcss";

.audio-waveform {
  display: flex;
  flex-direction: column;
}

.channel-label {
  @apply text-xs;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(var(--color-main) / 25%);
  padding: 2px 8px;
}

.waveform-container {
  display: flex;
  position: relative;
}

.waveform {
  @apply transition-all;
  height: var(--ch-height, 128px);
  width: 100%;

  padding-block: 4px;

  background: rgba(var(--color-main) / 10%);
}

.waveform-path {
  @apply transition-all;
  /* stroke: rgb(var(--color-main)); */
  /* stroke-opacity: 25%; */
  fill: rgb(var(--color-main));
  fill-opacity: 75%;
}
</style>
