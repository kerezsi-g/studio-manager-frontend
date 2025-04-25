export function formatTime(seconds: number) {
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}
