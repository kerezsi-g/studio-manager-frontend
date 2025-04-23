<script setup lang="ts">
import { clamp, useMediaControls } from '@vueuse/core'
import { computed, ref } from 'vue'

import Scrubber from './components/Scrubber.vue'

import MediaControls from './components/MediaControls.vue'
import MediaDuration from './components/MediaDuration.vue'
import MediaVolume from './components/MediaVolume.vue'
import AudioWaveform from './components/AudioWaveform.vue'
import type { AudioPeaks } from '@/api-client'
import { DataLoader } from '../data-loader'

const audio = ref<HTMLAudioElement>()
// const loop = shallowRef(false)

const props = defineProps<{
  sha256: string
}>()

const controls = useMediaControls(audio, {
  src: {
    src: `/api/files/${props.sha256}`,
  },
})

const { playing, buffered, currentTime, duration, volume, muted } = controls

const endBuffer = computed(() =>
  buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0,
)

function handleSeek(value: number) {
  currentTime.value += clamp(value, 0, duration.value)
}

async function fetchWaveform(args: { sha256: string }) {
  const response = await fetch(`/api/files/${args.sha256}?preview=true`)
  const json = await response.json()
  return json as AudioPeaks
}
</script>
<template>
  <DataLoader :fn="fetchWaveform" :args="{ sha256: props.sha256 }" v-slot="{ data }">
    <div class="audio-player" v-if="data">
      <audio ref="audio" />

      <AudioWaveform
        :peaks="data.peaks"
        :bits="data.bits"
        :channels="data.channels"
        :length="data.length"
      />

      <Scrubber v-model:current-time="currentTime" :max="duration" :secondary="endBuffer" />

      <MediaDuration :currentTime="currentTime" :duration="duration" />

      <MediaVolume v-model:volume="volume" v-model:muted="muted" />

      <MediaControls v-model:playing="playing" @seek="handleSeek" />
    </div>
  </DataLoader>
</template>
<style lang="css">
.audio-player {
  background-color: rgba(0 0 0 / 90%);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>
