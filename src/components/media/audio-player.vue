<script setup lang="ts">
import { clamp, useMediaControls } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import type { AudioPeaks, ProjectMedia } from '@/api-client'

import { VButton } from '@/components/ui/Button'

import { DataLoader } from '../data-loader'

import {
  MediaControls,
  MediaDuration,
  MediaVolume,
  MediaInfo,
  AudioWaveformCanvas,
  Scrubber,
  TimestampMarker,
} from './components'
import TrackOverlay from './components/TrackOverlay.vue'

const props = defineProps<ProjectMedia>()

const srcUrl = computed(() => `/api/files/${props.sha256}`)

const audio = ref<HTMLAudioElement>()

const controls = useMediaControls(audio, {
  src: {
    src: srcUrl.value,
  },
})

const { playing, /* buffered, */ currentTime, duration, volume, muted } = controls

// // No real practical use for now
// const endBuffer = computed(() =>
//   buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0,
// )

const loop = ref(false)
const loopRegion = ref<(number | null)[]>([null, null])
const minTime = computed(() => loopRegion.value[0] ?? 0)
const maxTime = computed(() => loopRegion.value[1] ?? duration.value)

async function fetchWaveform(args: { sha256: string }) {
  const response = await fetch(`/api/files/${args.sha256}?preview=true`)
  const json = await response.json()
  return json as AudioPeaks
}

defineEmits<{
  (c: 'submit-issue', evt: MouseEvent, timestamp?: number, length?: number): void
}>()

function markLoopRegionStart(timestamp: number) {
  loopRegion.value[0] = timestamp
}

function markLoopRegionEnd(timestamp: number) {
  loopRegion.value[1] = timestamp
}

function markRegion(name: string) {
  if (name === 'regionStart') {
    markLoopRegionStart(currentTime.value)
  }

  if (name === 'regionEnd') {
    markLoopRegionEnd(currentTime.value)
  }
}

function clearLoopRegion() {
  loopRegion.value = [null, null]
}

function handleSeek(value: number) {
  const target = currentTime.value + value
  currentTime.value = clamp(target, minTime.value, maxTime.value)
}

watch(currentTime, (current, previous) => {
  // Check if the current time has reached the end of the loop region by natural means ie. playback
  if (playing.value && current >= maxTime.value && previous < maxTime.value) {
    // Reset back to the start of the loop region if looping enabled
    if (loop.value) {
      currentTime.value = minTime.value
    }

    // Stop the player if not looping
    if (!loop.value) {
      playing.value = false
    }
  }
})
</script>
<template>
  <div class="audio-player" :style="{ '--duration': duration }">
    <audio ref="audio" />

    <nav class="flex items-center justify-center gap-4">
      <MediaInfo v-bind="props" />

      <MediaControls
        v-model:playing="playing"
        v-model:loop="loop"
        @place-marker="markRegion"
        @clear-markers="clearLoopRegion"
        @seek="(value) => handleSeek(value)"
      />

      <MediaVolume v-model:volume="volume" v-model:muted="muted" />

      <MediaDuration :current-time="currentTime" :duration="duration" />

      <VButton size="sm" color="error" @click="(e) => $emit('submit-issue', e, currentTime)">
        Submit issue
      </VButton>
      <a :href="srcUrl + '?download=true'" :download="props.fileName">
        <VButton size="sm"> Download </VButton>
      </a>
    </nav>

    <div class="waveform-container palette-secondary">
      <DataLoader :fn="fetchWaveform" :args="{ sha256: props.sha256 }" v-slot="{ data }">
        <AudioWaveformCanvas v-if="data" v-bind="data" :key="sha256" />
      </DataLoader>

      <TrackOverlay
        class="progress-overlay"
        v-if="duration > 0"
        :start="minTime"
        :end="currentTime"
      />

      <template v-if="duration > 0">
        <slot name="markers-back" v-bind="{ currentTime, duration }" />
      </template>

      <TimestampMarker v-if="loopRegion[0] !== null" :at="loopRegion[0]" class="marker-region">
        <template #label-top> A </template>
      </TimestampMarker>

      <TimestampMarker v-if="loopRegion[1] !== null" :at="loopRegion[1]" class="marker-region">
        <template #label-top> B </template>
      </TimestampMarker>

      <template v-if="duration > 0">
        <slot name="markers-front" v-bind="{ currentTime, duration }" />
      </template>

      <Scrubber v-if="duration > 0" v-model:current-time="currentTime" :min="0" :max="duration" />
    </div>
  </div>
</template>
<style lang="css">
.progress-overlay {
  --color-main: 20 184 166;
  --overlay-opacity: 25%;
}

.marker-region {
  --color-main: 100 116 139;
}

.audio-player {
  /* background-color: rgba(var(--surface) / 50%); */
  display: flex;
  padding: 0.5rem 1rem;
  gap: 8px;
  flex-direction: column;
  width: 100%;

  --gutter: 8px;
}

.waveform-container {
  display: flex;
  width: 100%;
  position: relative;
  box-sizing: content-box;
  height: 80px;
  overflow: hidden;
  border: 1px solid rgba(var(--color-text) / 15%);
  border-radius: 3px;
  /* background-color: red; */
  /* height: 100%; */
  background-color: rgba(0 0 0 / 25%);

  margin-block: var(--gutter, 0);
}
</style>
