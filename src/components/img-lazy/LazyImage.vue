<script setup lang="ts">
import { ref } from 'vue'

const pending = ref(true)
const hidden = ref(false)

function onImageLoad() {
  pending.value = false
}

function onError() {
  hidden.value = true
}
</script>
<template>
  <img class="lazy-load" @load="onImageLoad" alt="" @error="onError" :class="{ hidden, pending }" />
</template>
<style lang="css">
img.lazy-load {
  /* transition: opacity 100ms ease-in-out; */
  opacity: 1;

  &.hidden {
    display: none;
  }

  &.pending {
    opacity: 0;
  }
}
</style>
