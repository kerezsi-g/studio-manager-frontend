<script setup lang="ts">
import { MediaAPI } from '@/api/client'
import AsyncLoader from '@/components/utility/AsyncLoader/AsyncLoader.vue'

interface Props {
  fileId: string
}

const props = defineProps<Props>()

const getter = async function ({ fileId }: Props) {
  const _token = MediaAPI.getFileAccessToken(fileId)
  const _peaks = MediaAPI.getAudioPeaks(fileId, {
    bits: 8,
    chunkSize: 4096
  })

  const [{ token }, { data: peaks }] = await Promise.all([_token, _peaks])

  return { token, peaks }
}
</script>
<template>
  <AsyncLoader :fn="getter" :args="{ ...$props }" v-slot="{ data }">
    <slot v-if="data" v-bind="{ token: data.token, peaks: data.peaks }" />
  </AsyncLoader>
</template>
<style lang="scss"></style>
