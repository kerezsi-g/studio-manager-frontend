<script setup lang="ts">
import { API } from '@/api'
import SolarIcon from '@/components/SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { VTextInput } from '@/components/ui/TextInput'
import { useAuthentication } from '@/composables/use-authentication'
import { stall } from '@/utils/timing'
import { Icon } from '@iconify/vue'
import { onMounted, reactive, ref } from 'vue'

const pending = ref(false)
const initialized = ref(false)
const error = ref()

const { currentUser, getUser } = useAuthentication()

onMounted(async () => {
  await getUser()
  initialized.value = true
})

const authParams = reactive({
  email: '',
  password: '',
})

async function handleSubmit() {
  pending.value = true
  error.value = undefined
  try {
    await stall(
      API.Auth.signIn({
        AuthParams: {
          email: authParams.email,
          password: authParams.password,
        },
      }),
      1500,
    )
    await getUser()
  } catch (err) {
    error.value = err
  } finally {
    pending.value = false
  }
}

const icon = 'solar:shield-user-line-duotone'
</script>
<template>
  <slot v-if="currentUser" />

  <form v-else-if="initialized" class="sign-in" @submit.prevent="handleSubmit">
    <header>Your Brand Goes Here</header>
    <hr />
    <Icon :icon="icon" class="icon-xl apply-palette palette-info" />
    <h3>Sign In Required</h3>
    <main>
      <VTextInput
        v-model="authParams.email"
        placeholder="Email"
        :class="{
          'palette-error': error,
          'apply-palette': error,
        }"
      >
        <template #prefix>
          <SolarIcon icon="lock-keyhole" class="icon-base" />
        </template>
      </VTextInput>
      <VTextInput
        v-model="authParams.password"
        type="password"
        placeholder="Password"
        :class="{
          'palette-error': error,
          'apply-palette': error,
        }"
      >
        <template #prefix>
          <SolarIcon icon="key-minimalistic-2" class="icon-base" />
        </template>
      </VTextInput>
      <VButton
        variant="filled"
        color="info"
        size="lg"
        :disabled="authParams.email === '' || authParams.password === ''"
        :action="handleSubmit"
      >
        Sign In
        <template #suffix>
          <SolarIcon icon="login" class="icon-base" />
        </template>
      </VButton>
    </main>
  </form>
</template>
<style lang="css">
@reference "tailwindcss";

.sign-in {
  @apply shadow-lg;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 4rem;

  border-radius: 3px;

  header {
    font-size: 3rem;
  }

  h3 {
    font-weight: 500;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  hr {
    width: 100%;
    color: white;
    opacity: 25%;
  }

  background-color: rgba(0 0 0 / 90%);

  main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    width: 100%;
  }
}
</style>
