<script setup lang="ts">
/**
 * Sourced from:
 *  - https://vueuse.org/core/useMediaControls/
 *  - https://github.com/vueuse/vueuse/blob/main/packages/core/useMediaControls/demo.vue
 *
 * TODO: should refactor probably
 */
import { useEventListener, useMouseInElement } from '@vueuse/core'
import { ref as deepRef, ref, watch } from 'vue'

const props = defineProps<{
  min: number
  max: number
  buffered: number
}>()

const scrubber = deepRef()
const scrubbing = ref(false)

const pendingValue = ref(0)

useEventListener('mouseup', () => (scrubbing.value = false), { passive: true })

const currentTime = defineModel<number>('currentTime', {
  required: true,
})

// const value = useVModel(props, 'modelValue', emit)
const { elementX, elementWidth } = useMouseInElement(scrubber)

watch([scrubbing, elementX], () => {
  const progress = Math.max(0, Math.min(1, elementX.value / elementWidth.value))
  pendingValue.value = progress * props.max
  if (scrubbing.value) currentTime.value = pendingValue.value
})
</script>
<template>
  <div
    ref="scrubber"
    class="scrubber-container"
    @mousedown="scrubbing = true"
    :class="{
      // active: scrubbing,
    }"
  >
    <div class="scrubber-progress" :style="{ '--progress': currentTime / max }" />
  </div>
</template>
<style lang="css">
.scrubber-container {
  position: absolute;
  inset: 0;

  /* background-color: rgba(var(--color-main) / var(--bg-opacity, 100%)); */
  /* transform-origin: left; */
  cursor: pointer;
}

.scrubber-progress {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: calc(100% - var(--progress) * 100%);
  background-color: rgba(var(--color-main) / 25%);
  border-right: 1px solid rgba(255 255 255 / 75%);

  /* opacity: 0.3; */
}

.scrubber-inner {
  position: relative;
  height: 100%;
  width: 100%;

  overflow: hidden;
}

.scrubber-outer {
  position: relative;
  height: 8px;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0 0 0 / 20%);

  /* box-shadow: inset 0px 0px 128px 0px red; */
}

.scrubber-buffered {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  /* background-color: rgba(var(--color-main) / 10%); */
}
</style>
