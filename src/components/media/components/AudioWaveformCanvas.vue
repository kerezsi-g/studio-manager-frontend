<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { WaveformRenderer } from '@/workers/waveform-renderer'
import type { AudioPeaks } from '@/api-client'

const props = defineProps<AudioPeaks>()

const canvas = ref<HTMLCanvasElement>()
const renderer = ref<WaveformRenderer>()
const rendered = ref(false)

onMounted(() => {
  renderer.value = new WaveformRenderer(props, canvas.value!)

  renderer.value.onRendered(() => {
    rendered.value = true
  })
})

onUnmounted(() => {
  renderer.value!.destroy()
})
</script>
<template>
  <canvas ref="canvas" class="waveform" :class="{ rendered }" />
</template>
<style lang="css">
@references 'tailwindcss';

.waveform {
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-property: all;

  width: 100%;
  height: 100%;

  opacity: 0;
  transform: scaleY(0.1);

  /* background: linear-gradient(180deg, transparent, rgba(var(--color-main) / 40%), transparent); */
  /* box-shadow: inset 0px 0px 64px rgba(255 255 255 / 10%); */
  /* background-color: rgba(0 0 0 / 50%); */
  &.rendered {
    opacity: 0.75;
    transform: scaleY(1);
  }
}
</style>
