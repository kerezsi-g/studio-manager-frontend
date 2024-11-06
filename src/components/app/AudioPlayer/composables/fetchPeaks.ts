import { API } from '@/api/client'

export async function fetchPeaks(fileId: string) {
  const { data } = await API.getAudioPeaks(fileId, {
    bits: 8,
    chunkSize: 4096
  })

  return data
}
