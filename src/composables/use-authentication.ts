import { API } from '@/api'
import type { UserData } from '@/api-client'
import { ref } from 'vue'

const currentUser = ref<UserData | null>(null)

async function getUser() {
  try {
    const user = await API.Auth.validate()
    currentUser.value = user
  } catch (err: unknown) {
    console.error(err)
    currentUser.value = null
  }
}

async function signOut() {
  try {
    await API.Auth.signOut()
    currentUser.value = null
  } catch (err: unknown) {
    console.error(err)
  }
}

export function useAuthentication() {
  return {
    getUser,
    currentUser,
    signOut,
  }
}

export function useCurrentUser() {
  if (currentUser.value) {
    return currentUser.value
  }
  throw new Error("Component must be mounted within an authenticated user's context.")
}
