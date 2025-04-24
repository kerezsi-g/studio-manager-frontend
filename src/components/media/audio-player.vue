<script setup lang="ts">
import { clamp, useMediaControls } from '@vueuse/core'
import { computed, ref } from 'vue'

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
} from './components'

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

defineEmits<{
  (c: 'submit-issue', evt: MouseEvent, timestamp?: number, length?: number): void
}>()
</script>
<template>
  <DataLoader :fn="fetchWaveform" :args="{ sha256: props.sha256 }" v-slot="{ data }">
    <div class="audio-player">
      <audio ref="audio" />

      <nav class="flex items-center justify-center gap-4">
        <MediaInfo v-bind="props" />
        <MediaControls v-model:playing="playing" @seek="handleSeek" />
        <MediaVolume v-model:volume="volume" v-model:muted="muted" />
        <MediaDuration :currentTime="currentTime" :duration="duration" />
        <VButton size="sm" color="error" @click="(e) => $emit('submit-issue', e, currentTime)">
          Submit issue
        </VButton>
        <VButton size="sm"> Download </VButton>
      </nav>

      <div class="waveform-container palette-secondary">
        <AudioWaveformCanvas v-if="data" v-bind="data" :key="sha256" />

        <Scrubber
          v-if="duration > 0"
          v-model:current-time="currentTime"
          :min="0"
          :max="duration"
          :buffered="endBuffer"
        />

        <template v-if="duration > 0">
          <slot name="markers" v-bind="{ currentTime, duration }" />
        </template>
      </div>
    </div>
  </DataLoader>
</template>
<style lang="css">
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
  height: 64px;
  overflow: hidden;
  border: 1px solid rgba(var(--color-text) / 15%);
  border-radius: 3px;
  /* background-color: red; */
  /* height: 100%; */
  background-color: rgba(0 0 0 / 25%);

  margin-block: var(--gutter, 0);
}
</style>
