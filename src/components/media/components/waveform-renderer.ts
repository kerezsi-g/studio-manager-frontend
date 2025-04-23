import type { AudioPeaks } from '@/api-client'

import type { InitEvent, RenderEvent } from './waveform-renderer.worker'

export class WaveformRenderer {
  private offscreenCanvas: OffscreenCanvas

  private worker = new Worker(new URL('./waveform-renderer.worker.ts', import.meta.url))

  constructor({ bits, peaks }: AudioPeaks, canvas: HTMLCanvasElement) {
    // console.log('Initializing `WaveformRenderer`')

    if (bits !== 8) {
      throw new Error('Bit depths other than 8 are not supported')
    }

    const buffers = peaks.map((channel) => new Int8Array(channel).buffer)

    this.offscreenCanvas = canvas.transferControlToOffscreen()

    const initEvent: InitEvent = {
      type: 'init',
      canvas: this.offscreenCanvas,
      channels: buffers,
      color: this.getColor(canvas),
    }

    this.worker.postMessage(initEvent, [this.offscreenCanvas, ...buffers])
  }

  public destroy() {
    this.worker.terminate()
  }

  private getColor(element: HTMLElement) {
    const rgb = getComputedStyle(element).getPropertyValue('--color-main')
    return `rgb(${rgb})`
  }
}
