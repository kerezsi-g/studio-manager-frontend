<script lang="ts">
const HIGHLIGHT_THRESHOLD = 2
</script>
<script setup lang="ts">
import { computed } from 'vue'
import MarkerArrow from './MarkerArrow.vue'

const props = defineProps<{
  at: number
  currentTime: number
  duration: number
}>()

const isActive = computed(() => {
  return Math.abs(props.currentTime - props.at) <= HIGHLIGHT_THRESHOLD
})

const position = computed(() => {
  return (props.at / props.duration) * 100 + '%'
})
</script>
<template>
  <span
    class="marker-single palette-error"
    :class="{ active: isActive }"
    :style="{ '--position': position }"
  >
    <MarkerArrow class="marker-arrow bottom" width="12" />

    <MarkerArrow class="marker-arrow top" width="12" />

    <div v-if="isActive" class="marker-content">
      <slot />
    </div>
  </span>
</template>
<style lang="css">
@reference "tailwindcss";

.marker-single {
  @apply transition-all;

  anchor-name: --marker-single;
  anchor-scope: all;

  position: absolute;
  top: 0;
  bottom: 0;
  right: calc(100% - var(--position));

  outline: 1px solid rgba(var(--color-main) / 100%);

  /* box-sizing: border-box; */
  box-shadow: 0px 0px 0px 2px rgba(var(--color-main) / 25%);
}

.marker-single.active {
  box-shadow: 0px 0px 0px 2px rgba(var(--color-main) / 50%);

  --shadow-opacity: 50%;
  --arrow-opacity: 100%;
}

.marker-arrow {
  fill: rgba(var(--color-main) / var(--arrow-opacity, 75%));

  position: fixed;
  position-anchor: --marker-single;

  justify-self: anchor-center;

  &.top {
    bottom: anchor(top);
    transform: rotate(180deg);
  }

  &.bottom {
    top: anchor(bottom);
  }
}

.marker-content {
  pointer-events: none;
  user-select: none;

  @apply shadow-lg;

  font-size: 14px;
  padding: 4px 8px;
  background-color: rgba(0 0 0 / 98%);

  z-index: 5;

  position: fixed;
  position-anchor: --marker-single;

  left: anchor(right);
  top: anchor(top);
  /* justify-self: anchor-center; */
  border-radius: 3px;

  margin: 3px;
}
</style>
