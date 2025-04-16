// declare const self: DedicatedWorkerGlobalScope

const chunks: Uint8Array[] = []

export interface HashWorkerPayload {
  chunk: Uint8Array
  final: boolean
}

export interface HashWorkerResult {
  hash: string
}

self.addEventListener('message', (event: MessageEvent<HashWorkerPayload>) => {
  if (event.data.chunk) {
    chunks.push(event.data.chunk)
  }

  if (event.data.final) {
    process()
  }
})

async function process() {
  try {
    // Concatenate all Uint8Array chunks into a single Uint8Array
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
    const combinedArray = new Uint8Array(totalLength)
    let offset = 0

    for (const chunk of chunks) {
      combinedArray.set(chunk, offset)
      offset += chunk.length
    }

    const digest = await crypto.subtle.digest('SHA-256', combinedArray)

    const hashArray = Array.from(new Uint8Array(digest))

    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    self.postMessage({ hash: hashHex })
  } catch (error: unknown) {
    console.error(error)
    self.postMessage({ error })
  } finally {
    self.close()
  }
}
