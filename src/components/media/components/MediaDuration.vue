<script setup lang="ts">
// import { computed } from 'vue'

defineProps<{
  currentTime: number
  duration: number
}>()

// const remainingTime = computed(() => props.duration - props.currentTime)

function formatDuration(seconds: number) {
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}
</script>
<template>
  <div class="media-duration">
    <span>
      {{ formatDuration(currentTime) }}
    </span>
    <span>/</span>
    <span> {{ formatDuration(duration) }} </span>
    <!-- <span> (-{{ formatDuration(remainingTime) }}) </span> -->
  </div>
</template>
<style lang="css">
.media-duration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 4px 8px;

  font-size: 16px;
  font-family: 'Roboto Mono';
  font-weight: 300;

  /* background-color: rgba(0 0 0 / 85%); */
}
</style>
