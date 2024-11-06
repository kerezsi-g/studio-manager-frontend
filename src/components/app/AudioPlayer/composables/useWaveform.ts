import type { core } from '@/api/api'
import WaveformData from './example.json'

export function useWaveform(dat: core.AudioPeaks) {
  console.log(dat.length, dat.peaks.length)

  const { peaks, bits } = dat

  const leftMax = []
  const leftMin = []

  const rightMax = []
  const rightMin = []

  for (let i = 0; i < peaks.length; i += 4) {
    leftMin.push(peaks[i])
    leftMax.push(peaks[i + 1])
    rightMin.push(peaks[i + 2])
    rightMax.push(peaks[i + 3])
  }

  const svg = {
    height: 2 ** bits,
    width: leftMin.length,
    left: generatePath([leftMax, leftMin], leftMin.length, 2 ** bits),
    right: generatePath([rightMax, rightMin], rightMin.length, 2 ** bits)
  }
v-bind="ch"
  let pathD = `M0,${height / 2}` // Start in the middle

  for (let i = 0; i < upper.length; i++) {
    // const x = (i / (normalizedData.length - 1))
    pathD += ` L${i},${upper[i]}`
  }

  for (let i = lower.length - 1; i >= 0; i--) {
    // const x = (i / (normalizedData.length - 1))
    pathD += ` L${i},${lower[i]}`
  }

  pathD += ` L0,${height / 2} Z` // End back in the middle and close

  return pathD
}
