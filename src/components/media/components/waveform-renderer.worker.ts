export interface InitEvent {
  type: 'init'
  canvas: OffscreenCanvas
  channels: ArrayBuffer[]
  color: string
}

export interface RenderEvent {
  type: 'render'
  color: string
  sampleStart: number
  sampleEnd: number
}

let canvas: OffscreenCanvas
let color: string
let channels: Int8Array[]

const averagedPeaks: number[] = []

self.addEventListener('message', (event: MessageEvent<InitEvent | RenderEvent>) => {
  if (event.data.type === 'init') {
    initialize(event.data)
  }

  if (event.data.type === 'render') {
    render(event.data.sampleStart, event.data.sampleEnd)
  }
})

function initialize(evt: InitEvent) {
  canvas = evt.canvas
  channels = evt.channels.map((buffer) => new Int8Array(buffer))

  color = evt.color

  canvas.width = channels[0].length
  canvas.height = 2 ** 8

  for (let i = 0; i < channels[0].length; i++) {
    const peak = avg(...channels.map((channel) => channel[i]))
    averagedPeaks.push(peak)
  }

  render(0, averagedPeaks.length)
}

let animationFrameId: number | null = null
const chunkSize = 1000

function render(sampleStart: number, sampleEnd: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = color
  ctx.lineWidth = 2 // Makes for a fuller waveform

  const height = canvas.height

  const totalSamples = sampleEnd - sampleStart
  let drawnSamples = 0

  const drawChunk = () => {
    if (drawnSamples < totalSamples) {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      const start = sampleStart + drawnSamples
      const end = Math.min(sampleStart + drawnSamples + chunkSize, sampleEnd)

      for (let i = start; i < end; i++) {
        const peak = averagedPeaks[i]
        const x = i
        const y = peak + height / 2

        if (i === sampleStart) {
          ctx.moveTo(x - 1, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      drawnSamples += chunkSize
      animationFrameId = requestAnimationFrame(drawChunk)
    } else {
      console.log('Waveform chunk rendered in worker.')
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawnSamples = 0 // Reset the drawing progress
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId) // Cancel any ongoing animation
  }
  drawChunk() // Start the chunked rendering
}

function avg(...values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length
}
