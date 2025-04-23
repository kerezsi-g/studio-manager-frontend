<script setup lang="ts">
/**
 * Sourced from:
 *  - https://vueuse.org/core/useMediaControls/
 *  - https://github.com/vueuse/vueuse/blob/main/packages/core/useMediaControls/demo.vue
 *
 * TODO: should refactor probably
 */
import { useEventListener, useMouseInElement } from '@vueuse/core'
import { ref as deepRef, shallowRef, watch } from 'vue'

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  secondary: { type: Number, default: 0 },
})

const scrubber = deepRef()
const scrubbing = shallowRef(false)
const pendingValue = shallowRef(0)

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
  <div ref="scrubber" class="scrubber-outer" @mousedown="scrubbing = true">
    <div class="scrubber-inner">
      <div
        class="scrubber-buffered"
        :style="{ transform: `translateX(${(secondary / max) * 100 - 100}%)` }"
      />
      <div
        class="scrubber-current"
        :style="{ transform: `translateX(${(currentTime / max) * 100 - 100}%)` }"
      />
    </div>
    <div
      class="absolute inset-0 hover:opacity-100 opacity-0"
      :class="{ '!opacity-100': scrubbing }"
    >
      <slot
        :pending-value="pendingValue"
        :position="`${Math.max(0, Math.min(elementX, elementWidth))}px`"
      />
    </div>
  </div>
</template>
<style lang="css">
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
}

.scrubber-current {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgba(var(--color-main) / var(--bg-opacity, 100%));
}

.scrubber-buffered {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  opacity: 0.3;
  background-color: rgba(var(--color-main) / 100%);
}
</style>
