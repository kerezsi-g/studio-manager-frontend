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

  render(0, channels[0].length)
}

function render(sampleStart: number, sampleEnd: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const height = canvas.height

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = color

  ctx.lineWidth = 2 // Makes for a fuller waveform
  ctx.beginPath()

  for (let i = sampleStart; i < sampleEnd; i++) {
    // Get the average of all channels at the given index
    const peak = avg(...channels.map((channel) => channel[i]))

    const x = i
    const y = peak + height / 2 // Normalize signed 8bit int to unsigned, we don't want negative Y coordinates

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
}

function avg(...values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length
}
