<script setup lang="ts">
defineProps<{
  start: number
  end: number
}>()
</script>
<template>
  <div class="track-overlay" :style="{ '--start': start, '--end': end }"></div>
</template>
<style lang="scss">
.track-overlay {
  --overlay-opacity: 25%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(calc(var(--start) / var(--duration)) * 100%);
  right: calc(calc(1 - var(--end) / var(--duration)) * 100%);
  background-color: rgba(var(--color-main) / var(--overlay-opacity));
}
</style>
