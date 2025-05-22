<script setup lang="ts">
import MarkerArrow from './MarkerArrow.vue'

defineProps<{
  at: number
  active?: boolean
}>()
</script>
<template>
  <span class="marker" :class="{ active }" :style="{ '--position': at }">
    <div class="marker-decoration top">
      <span class="marker-decoration-content" v-if="$slots['label-top']">
        <slot name="label-top" />
      </span>
      <MarkerArrow direction="down" width="12" />
    </div>

    <div class="marker-decoration bottom">
      <span class="marker-decoration-content" v-if="$slots['label-bottom']">
        <slot name="label-bottom" />
      </span>
      <MarkerArrow direction="up" width="12" />
    </div>
  </span>
</template>
<style lang="css">
@reference "tailwindcss";

.marker {
  /* @apply transition-all; */

  --opacity: 85%;
  z-index: 1;

  anchor-name: --marker-single;
  anchor-scope: all;

  position: absolute;
  top: 0;
  bottom: 0;
  right: calc(100% - calc(var(--position) / var(--duration)) * 100%);

  outline: 1px solid rgba(var(--color-main) / 100%);
  width: 0px;
  /* background-color: rgba(var(--color-main) / 50%); */

  /* box-sizing: border-box; */
  box-shadow: 0px 0px 0px 2px rgba(var(--color-main) / 25%);

  opacity: var(--opacity);
}

.marker.active {
  box-shadow: 0px 0px 0px 2px rgba(var(--color-main) / 50%);

  --shadow-opacity: 50%;
  --opacity: 100%;
}

.marker-arrow {
  fill: rgb(var(--color-main));
}

.marker-decoration {
  position: fixed;
  position-anchor: --marker-single;
  justify-self: anchor-center;

  display: flex;
  flex-direction: column;
  align-items: center;

  &.top {
    bottom: anchor(top);
  }

  &.bottom {
    top: anchor(bottom);
    flex-direction: column-reverse;
  }

  filter: drop-shadow(0px 0px 2px rgba(0 0 0 / 100%));
}

.marker-decoration-content {
  background-color: rgb(var(--color-main));
  text-shadow: 0px 1px 2px rgba(0 0 0 / 50%);
  padding: 0px 8px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 500;
  margin: -4px;
  z-index: 2;
}

/* .marker-content {
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
  border-radius: 3px;

  margin: 3px;
} */
</style>
