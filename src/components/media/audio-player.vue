<script setup lang="ts">
import { clamp, useMediaControls } from '@vueuse/core'
import { computed, ref } from 'vue'

import Scrubber from './components/Scrubber.vue'

import MediaControls from './components/MediaControls.vue'
import MediaDuration from './components/MediaDuration.vue'
import MediaVolume from './components/MediaVolume.vue'

import type { AudioPeaks, ProjectMedia } from '@/api-client'
import { DataLoader } from '../data-loader'
import AudioWaveformCanvas from './components/AudioWaveformCanvas.vue'
import VButton from '../ui/Button/v-button.vue'
import SolarIcon from '../SolarIcon.vue'

const audio = ref<HTMLAudioElement>()
// const loop = shallowRef(false)

const props = defineProps<ProjectMedia>()

const srcUrl = computed(() => `/api/files/${props.sha256}`)

const controls = useMediaControls(audio, {
  src: {
    src: srcUrl.value,
  },
})

const { playing, buffered, currentTime, duration, volume, muted } = controls

const endBuffer = computed(() =>
  buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0,
)

function handleSeek(value: number) {
  const target = currentTime.value + value

  currentTime.value = clamp(target, 0, duration.value)
}

async function fetchWaveform(args: { sha256: string }) {
  const response = await fetch(`/api/files/${args.sha256}?preview=true`)
  const json = await response.json()
  return json as AudioPeaks
}
</script>
<template>
  <DataLoader :fn="fetchWaveform" :args="{ sha256: props.sha256 }" v-slot="{ data }">
    <div class="audio-player">
      <header class="flex items-center gap-4 px-4">
        <SolarIcon icon="music-note" variant="bold-duotone" width="24" />
        <div class="flex flex-col">
          <h1 class="text-lg">{{ fileName }}</h1>
          <h2 class="opacity-70 text-xs">{{ contentType }}</h2>
        </div>
        <VButton size="sm"> Download file </VButton>
      </header>

      <audio ref="audio" />

      <AudioWaveformCanvas
        v-model:current-time="currentTime"
        v-bind="data"
        :key="sha256"
        v-if="data"
      >
        <Scrubber
          v-model:current-time="currentTime"
          :min="0"
          :max="duration"
          :buffered="endBuffer"
        />
      </AudioWaveformCanvas>

      <MediaDuration :currentTime="currentTime" :duration="duration" />

      <nav class="flex items-center justify-center">
        <MediaControls v-model:playing="playing" @seek="handleSeek" />
        <MediaVolume v-model:volume="volume" v-model:muted="muted" />
      </nav>
    </div>
  </DataLoader>
</template>
<style lang="css">
.audio-player {
  background-color: rgba(var(--surface) / 95%);
  display: flex;
  padding: 1rem;
  flex-direction: column;
  width: 100%;
}
</style>
