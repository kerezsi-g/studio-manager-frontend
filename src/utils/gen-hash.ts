interface HashWorkerResult {
  hash: string
}

export async function generateSha256Hash(file: File) {
  const worker = new Worker(new URL('./gen-hash.worker.ts', import.meta.url))

  return new Promise<string>(async (resolve, reject) => {
    worker.addEventListener('message', (event: MessageEvent<HashWorkerResult>) => {
      if (event.data.hash) {
        resolve(event.data.hash)
      }

      worker.terminate()
    })

    worker.addEventListener('error', (error) => {
      worker.terminate()
      reject(error)
    })

    const stream = file.stream()

    const reader = stream.getReader()

    try {
      while (true) {
        const { done, value } = await reader.read()

        worker.postMessage({ chunk: value, final: done })

        if (done) break
      }
    } catch (e: unknown) {
      reject(e)
      worker.terminate()
    }
  })
}
