<script lang="ts">
const injectionKey = Symbol('audio-context')

/**
 * TODO: rename
 *
 * Used for maintaing audio player between file switches
 */
interface State {
  playing: boolean
  timestamp: number
}
interface AudioContextProps {
  accessToken: string
  initialState?: State
}

export interface AudioContext {
  timestamp: ComputedRef<string>
  playheadPosition: ComputedRef<number>
  volume: Ref<number>
  currentTime: Ref<number>
  duration: Ref<number>
  playing: Ref<boolean>
  seek: (t: number) => void
  seekRelative: (t: number) => void
  seekToPercentage: (t: number) => void
  togglePlayback: () => void
}

export function useAudioContext() {
  const ctx = inject<AudioContext>(injectionKey)

  if (!ctx) throw 'AudioContext is not provided'

  return ctx
}
function createAudioContext(ctx: AudioContext) {
  provide(injectionKey, ctx)
}
</script>
<script setup lang="ts">
import { formatTimestamp } from '@/utils'
import { clamp, useMediaControls } from '@vueuse/core'
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  type ComputedRef,
  type Ref
} from 'vue'

const props = defineProps<AudioContextProps>()

const emit = defineEmits<{
  (c: 'unmount', v: State): void
}>()

const fileUrl = computed(() => `/api/media/${props.accessToken}`)
const audioElementRef = ref<HTMLAudioElement>()

const mediaControls = useMediaControls(audioElementRef, {
  src: fileUrl.value
})

const { currentTime, duration, playing, volume } = mediaControls

const timestamp = computed(() => {
  return formatTimestamp(currentTime.value)
})

const playheadPosition = computed(() => {
  return currentTime.value / duration.value
})

onMounted(() => {
  if (props.initialState) {
    currentTime.value = props.initialState.timestamp
    playing.value = props.initialState.playing
  }
})

onBeforeUnmount(() => {
  emit('unmount', {
    playing: playing.value,
    timestamp: currentTime.value
  })
})

async function initialize({ fileId }: { fileId: string }) {
  //   const { data } = await MediaAPI.getAudioPeaks(fileId, {)
  //   return data
}

// const seekDebounced = debounce(seekToPercentage, 10)

function seek(targetTime: number) {
  currentTime.value = clamp(targetTime, 0, duration.value)
}

function seekRelative(offset: number) {
  seek(currentTime.value + offset)
}

function seekToPercentage(pct: number) {
  seek(duration.value * pct)
}

function togglePlayback() {
  playing.value = !playing.value
}

const context: AudioContext = {
  timestamp,
  playheadPosition,
  volume,
  playing,
  currentTime,
  duration,
  seek,
  seekRelative,
  seekToPercentage,
  togglePlayback
}

createAudioContext(context)

defineExpose(context)
</script>
<template>
  <!-- <AsyncLoader :fn="initialize" :args="{ fileId }" v-slot="{ data }"> -->
  <slot v-bind="{ controls: context }" />
  <!-- </AsyncLoader> -->
  <audio ref="audioElementRef" controls hidden />
</template>
<style lang="scss"></style>
