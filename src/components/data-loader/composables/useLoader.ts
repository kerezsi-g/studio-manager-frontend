import { type Ref, ref } from 'vue'

export interface LoaderOptions<Data, Params> {
  fn: (params: Params) => Promise<Data>
  fallback?: Data | null
  collate?: (oldResult: Data, newResult: Data) => Data
  flushOnError?: boolean
}

type MaybeCancellablePromise<T> = Promise<T> & {
  cancel?: () => unknown
}

export function useLoader<Data, Params>({
  fn,
  collate,
  fallback = null,
  flushOnError,
}: LoaderOptions<Data, Params>) {
  // =================================================================
  // #region State
  const data = ref(fallback ?? null) as Ref<Data | null>
  const error = ref<unknown>()
  const pending = ref<boolean>()
  const executionCount = ref<number>(0)
  const onLoadHandlers: Array<(d: Data) => unknown> = []

  let __current_promise: MaybeCancellablePromise<Data> | null = null
  // #endregion
  // =================================================================

  async function load(params: Params) {
    pending.value = true

    // If the wrapped function returns a cancellable promise, use it
    if (__current_promise) __current_promise.cancel?.()

    try {
      const __promise = fn(params)
      __current_promise = __promise

      const result: Data = await __promise

      // Exit early if a newew operation has been initiated
      if (__promise !== __current_promise) return

      handleLoad(result)

      // if (pollingEnabled.value) setTimeout(() => {})
      // return result
    } catch (err) {
      handleError(err)
    } finally {
      pending.value = false
    }
  }

  function handleError(err: unknown) {
    console.error(err)
    error.value = err
    if (flushOnError) data.value = fallback ?? null
  }

  function handleLoad(result: Data) {
    if (collate && data.value) {
      data.value = collate(data.value, result)
    } else {
      data.value = result
    }

    for (const handler of onLoadHandlers) {
      handler(result)
    }

    executionCount.value = executionCount.value + 1
  }

  function onLoad(fn: (d: Data) => void) {
    onLoadHandlers.push(fn)

    function disposer() {
      onLoadHandlers.filter((handler) => handler !== fn)
    }

    return disposer
  }

  return {
    data,
    pending,
    error,
    load,
    onLoad,
    executionCount,
  }
}
