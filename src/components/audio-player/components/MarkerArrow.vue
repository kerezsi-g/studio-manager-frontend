<script setup lang="ts">
defineProps<{
  direction: 'up' | 'down'
}>()
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -12 16 12"
    width="16"
    class="marker-arrow"
    :class="direction"
  >
    <path d="M0 0V-4l8-8 8 8V0H0" />
  </svg>

  <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.1 -7.1 16.2 7.2"
    class="marker-arrow"
    :class="direction"
  >
    <path d="M0 0 7-7 9-7l7 7" />
  </svg> -->
</template>
<style lang="css">
.marker-arrow {
  &.down {
    transform: rotate(180deg);
  }
}
</style>
