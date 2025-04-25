<script setup lang="ts">
import { formatTime } from '@/utils/formatting'

// import { computed } from 'vue'

defineProps<{
  currentTime: number
  duration: number
}>()

// const remainingTime = computed(() => props.duration - props.currentTime)
</script>
<template>
  <div class="media-duration">
    <span>
      {{ formatTime(currentTime) }}
    </span>
    <span>/</span>
    <span> {{ formatTime(duration) }} </span>
    <!-- <span> (-{{ formatDuration(remainingTime) }}) </span> -->
  </div>
</template>
<style lang="css">
.media-duration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  line-height: normal;

  /* padding: 0px 8px; */

  font-size: 12px;
  font-family: 'Roboto Mono';
  font-weight: 400;

  /* background-color: rgba(0 0 0 / 85%); */
}
</style>
