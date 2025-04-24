import type { AudioPeaks } from '@/api-client'

import type {
  WaveformRendererEmit,
  InitEvent,
  RenderCompletedEvent,
} from './waveform-renderer.worker'

type EventHandler<T extends WaveformRendererEmit['data']> = (event: T) => void

export class WaveformRenderer {
  private offscreenCanvas: OffscreenCanvas

  private worker = new Worker(new URL('./waveform-renderer.worker.ts', import.meta.url))

  private eventHandlers: EventHandler<RenderCompletedEvent>[] = []

  public onRendered(this: WaveformRenderer, handler: (event: RenderCompletedEvent) => void) {
    this.eventHandlers.push(handler)

    return () => {
      this.eventHandlers = this.eventHandlers.filter((h) => h !== handler)
    }
  }

  private handleWorkerEvents(this: WaveformRenderer, { data }: WaveformRendererEmit) {
    switch (data.type) {
      case 'render-completed':
        for (const handler of this.eventHandlers) {
          handler(data)
        }
        break
    }
  }

  constructor({ bits, peaks }: AudioPeaks, canvas: HTMLCanvasElement) {
    // console.log('Initializing `WaveformRenderer`')

    if (bits !== 8) {
      throw new Error('Bit depths other than 8 are not supported')
    }

    const buffers = peaks.map((channel) => new Int8Array(channel).buffer)

    this.offscreenCanvas = canvas.transferControlToOffscreen()

    this.worker.addEventListener('message', (event) => this.handleWorkerEvents(event))

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
