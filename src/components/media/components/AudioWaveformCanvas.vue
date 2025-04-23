<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { WaveformRenderer } from './waveform-renderer'
import type { AudioPeaks } from '@/api-client'

const props = defineProps<AudioPeaks>()

const canvas = ref<HTMLCanvasElement>()

const renderer = ref<WaveformRenderer>()

onMounted(() => {
  renderer.value = new WaveformRenderer(props, canvas.value!)
  // drawWaveform(0, props.length)
})

onUnmounted(() => {
  renderer.value!.destroy()
})
</script>
<template>
  <div class="waveform-container">
    <canvas ref="canvas" class="waveform" />
    <slot></slot>
  </div>
</template>
<style lang="css">
.waveform-container {
  display: flex;
  width: 100%;
  position: relative;
  box-sizing: content-box;
  height: 128px;
  /* padding-block: 4px; */

  border-block: 1px solid rgba(var(--color-main) / 100%);
  /* background-color: red; */
  /* height: 100%; */
  background-color: rgba(0 0 0 / 50%);
}

.waveform {
  width: 100%;
  height: 100%;

  background: linear-gradient(180deg, transparent, rgba(var(--color-main) / 40%), transparent);

  /* box-shadow: inset 0px 0px 64px rgba(255 255 255 / 10%); */
  /* background-color: rgba(0 0 0 / 50%); */
}
</style>
