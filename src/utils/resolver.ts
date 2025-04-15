export function createResolver<T, E = unknown>() {
  let resolveFn: null | ((value: T) => unknown) = null
  let rejectFn: null | ((value: E) => unknown) = null

  const promise = new Promise<T>((__resolve, __reject) => {
    resolveFn = __resolve
    rejectFn = __reject
  })

  return {
    resolve: resolveFn!,
    reject: rejectFn!,
    promise,
  }
}
