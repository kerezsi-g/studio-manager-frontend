export function createResolver() {
  let resolveFn: null | (<T>(value: T) => unknown) = null
  let rejectFn: null | (<E>(value: E) => unknown) = null

  const promise = new Promise<unknown>((__resolve, __reject) => {
    resolveFn = __resolve
    rejectFn = __reject
  })

  return {
    resolve: resolveFn!,
    reject: rejectFn!,
    promise,
  }
}
