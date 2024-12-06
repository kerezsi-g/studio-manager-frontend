import Client from './api'
import { getToken } from '@/composables/useAuthentication'

const client = new Client('/api', {
  auth: () => {
    const token = getToken()
    return {
      authorization: token
    }
  }
})

export const CoreAPI = client.Core
export const MediaAPI = client.File
