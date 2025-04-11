export function pruneFalsyProperties<T>(o: object) {
  return Object.fromEntries(Object.entries(o).filter(([_, v]) => Boolean(v) || v === false)) as T
}

function getRawValue(v: any) {
  if (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    typeof v === undefined
  )
    return v
  if (v?.valueOf) return v.valueOf()
  if (v?.toString) return v.toString()
  return v
}

export function shallowEquals(a: any, b: any) {
  if (a == b) return true
  if (Object.keys(a).length !== Object.keys(b).length) return false
  return Object.keys(a).every((k) => {
    return getRawValue(a[k]) === getRawValue(b[k])
  })
}
