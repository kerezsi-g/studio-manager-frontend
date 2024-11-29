export function sleep<T>(ms: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve.bind(null, value!), ms))
}

export async function stall<T>(promise: Promise<T>, delay: number): Promise<T> {
  await Promise.allSettled([promise, sleep(delay)])
  return promise
}
