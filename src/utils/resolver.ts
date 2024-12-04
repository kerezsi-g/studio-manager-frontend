export function createResolver() {
  let resolveFn: <T>(value: T) => unknown
  let rejectFn: <E>(value: E) => unknown

  const promise = new Promise<any>((__resolve, __reject) => {
    resolveFn = __resolve
    rejectFn = __reject
  })

  return {
    resolve: resolveFn!,
    reject: rejectFn!,
    promise
  }
}
