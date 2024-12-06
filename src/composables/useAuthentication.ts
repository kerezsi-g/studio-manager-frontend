import { types } from '@/api/api'
import { CoreAPI } from '@/api/client'
import { sleep, stall } from '@/utils/timing'
import { computed, onMounted, ref } from 'vue'
import { useSessionStorage } from '@vueuse/core'

const __currentUser = ref<types.UserData | null>(null)

const __token = useSessionStorage('ACCESS_TOKEN', '')

interface AuthParams {
  email: string
  password: string
}

export function getToken() {
  return __token.value ?? ''
}

export async function signIn({ email, password }: AuthParams) {
  const { data, token } = await stall(CoreAPI.signIn({ email, password }), 800)

  __token.value = token

  __currentUser.value = data
}

export async function signOut() {
  await sleep(200)
  __token.value = ''
  __currentUser.value = null
}

export const currentUser = computed(() => {
  /**
   * This simply to prevent the `__currentUser` variable from being writable outside this file
   */
  return __currentUser.value
})

async function checkIdentity() {
  try {
    const { data, token } = await CoreAPI.checkIdentity()

    __currentUser.value = data

    __token.value = token
  } catch (err) {
    //User is not logged in
  }
}

export function useAuthentication() {
  const pending = ref(false)

  onMounted(async () => {
    pending.value = true

    await checkIdentity()

    pending.value = false
  })

  return { pending }
}
