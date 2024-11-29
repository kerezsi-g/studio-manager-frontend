import Client from './api'
import { getToken } from '@/composables/useAuthentication'

export const API = new Client('/api', {
  auth: () => {
    const token = getToken()
    return {
      authorization: token
    }
  }
}).Core
