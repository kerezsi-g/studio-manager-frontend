// import type { AudioChannelPeaks } from './channel-waveform.vue'

import type { core } from '@/api/api'

interface UseWaveformSvgParams {
  bits: number
  length: number
  peaks: number[]
}

export function useWaveformSvg(params: UseWaveformSvgParams): string {
  const { bits, length, peaks } = params

  console.log({ ...params })

  const height = 2 ** bits

  const [min, max] = deinterleave(peaks, 2, 1)

  console.log({ min, max })

  let pathD = `M0,${height / 2}` // Start in the middle

  // Index variable, we'll reuse this for a reversed iteration
  let i: number

  // Draw the upper edge of the waveform
  for (i = 0; i < length; i++) {
    pathD += ` L${i},${max[i]}`
  }

  // Draw the lower edge of the waveform
  for (i = length - 1; i >= 0; i--) {
    pathD += ` L${i},${min[i]}`
  }

  pathD += ` L0,${height / 2} Z` // End back in the middle and close

  return pathD
}

function deinterleave(data: number[], outputArrays: number, groupLength: number = 2): number[][] {
  if (data.length % (outputArrays * groupLength) !== 0) {
    throw new Error('Invalid length of input array (must be a multiple of channels * groupLength)')
  }

  const result: number[][] = []
  for (let i = 0; i < outputArrays; i++) {
    result[i] = []
  }

  for (let i = 0; i < data.length; i += outputArrays * groupLength) {
    for (let ch = 0; ch < outputArrays; ch++) {
      for (let j = 0; j < groupLength; j++) {
        result[ch].push(data[i + ch * groupLength + j])
      }
    }
  }

  return result
}
