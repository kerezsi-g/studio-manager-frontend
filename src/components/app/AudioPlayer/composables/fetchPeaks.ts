import { CoreAPI } from '@/api/client'

export async function fetchPeaks(fileId: string) {
  const { data } = await CoreAPI.getAudioPeaks(fileId, {
    bits: 8,
    chunkSize: 4096
  })

  return data
}
