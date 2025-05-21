enum Magnitude {
  KB = 1024,
  MB = 1024 ** 2,
  GB = 1024 ** 3,
}

export function formatBytes(size: number) {
  if (size < Magnitude.KB) {
    return `${size.toLocaleString()}`
  }

  if (size < Magnitude.MB) {
    return `${(size / Magnitude.KB).toLocaleString()} KB`
  }

  if (size < Magnitude.GB) {
    return `${(size / Magnitude.MB).toLocaleString()} MB`
  }

  return `${(size / Magnitude.GB).toLocaleString()} GB`
}
