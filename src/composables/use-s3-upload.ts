/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { detectFilenameMime } from 'mime-detect'
import { createResolver } from '@/utils/resolver'
import { API } from '@/api'

export async function useS3Upload(file: File) {
  const progress = ref(0)
  const error = ref<Error | null>(null)

  const pending = ref(false)
  const success = ref(false)

  const response = ref<any>(null)

  const xhr = new XMLHttpRequest()

  const { promise, resolve, reject } = createResolver<string | null>()

  const buf = await file.arrayBuffer()

  const [sha256, detectedMime] = await Promise.all([genHash(buf), detectFilenameMime(file.name)])

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      progress.value = Math.round((event.loaded * 100) / event.total)
    }
  })

  xhr.upload.addEventListener('error', (err) => {
    pending.value = false
    error.value = new Error('Network error during upload.')

    reject(err)
  })

  xhr.upload.addEventListener('abort', () => {
    pending.value = false
    error.value = new Error('Upload aborted by user.')

    resolve(null)
  })

  xhr.onloadend = () => {
    pending.value = false

    if (xhr.status >= 200 && xhr.status < 300) {
      success.value = true

      resolve(sha256)
    } else {
      error.value = new Error(`Upload failed with status ${xhr.status}`)
    }
  }

  async function start() {
    if (pending.value) {
      console.warn('Upload already in progress.')
      return
    }

    pending.value = true

    const { uploadUrl } = await API.Files.createUploadUrl({
      fileName: file.name,
      contentType: detectedMime,
      sha256,
    })

    xhr.open('PUT', uploadUrl)

    xhr.setRequestHeader('Content-Type', detectedMime)

    xhr.send(file)

    return promise
  }

  return {
    progress,
    error,
    pending,
    success,
    response,
    start,
  }
}

async function genHash(buffer: ArrayBuffer) {
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer)

  const hexString = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return hexString
}

export type S3Upload = Awaited<ReturnType<typeof useS3Upload>>
