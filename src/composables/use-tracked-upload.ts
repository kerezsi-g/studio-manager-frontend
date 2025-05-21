import { ref } from 'vue'
import { createResolver } from '@/utils/resolver'

interface Options {
  url: string
  method?: 'PUT' | 'POST'
}

export function useTrackedUpload<R>(file: File | FormData, { url, method = 'PUT' }: Options) {
  const progress = ref<number>(0)
  const error = ref<Error | null>(null)

  const pending = ref(false)
  const success = ref(false)

  const response = ref<Response | null>(null)

  const xhr = new XMLHttpRequest()

  const { promise, resolve, reject } = createResolver<R | null>()

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const pct = event.loaded / event.total

      progress.value = pct
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

  xhr.onloadend = async () => {
    pending.value = false

    if (xhr.status >= 200 && xhr.status < 300) {
      success.value = true

      const resp = JSON.parse(xhr.response as string) as R

      resolve(resp)
    } else {
      error.value = new Error(`Upload failed with status ${xhr.status}`)
    }
  }

  async function execute() {
    if (pending.value) {
      console.warn('Upload already in progress.')
      return
    }

    pending.value = true

    xhr.open(method, url)
    xhr.send(file)

    return promise
  }

  return {
    progress,
    error,
    pending,
    success,
    response,
    execute,
  }
}

export type TrackedUpload = ReturnType<typeof useTrackedUpload>
