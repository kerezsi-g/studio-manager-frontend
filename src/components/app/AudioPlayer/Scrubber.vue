<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useAudioContext } from '../AudioContext/AudioContext.vue'

const { currentTime, duration } = useAudioContext()
</script>
<template>
  <input type="range" min="0" :max="duration" class="scrubber" step="0.5" v-model="currentTime" />
</template>
<style lang="scss"></style>
