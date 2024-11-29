<script setup lang="ts">
import { BrandLogo } from '@/components/app'
import { PendingOverlay, VButton, VInput } from '@/components/ui'
import { signIn } from '@/composables/useAuthentication'
import { ref, reactive, computed } from 'vue'

const params = reactive({
  email: '',
  password: ''
})

const pending = ref(false)

const error = ref<string | null>(null)

async function handleSignIn() {
  try {
    pending.value = true
    error.value = null

    await signIn(params)
  } catch (err) {
    error.value = 'Invalid username or password'
  } finally {
    pending.value = false
  }
}

const disallowSubmit = computed(() => {
  return !params.email || !params.password || pending.value
})
</script>
<template>
  <div class="login-backdrop">
    <main class="login-window">
      <form class="login-form" @submit.prevent="handleSignIn" v-auto-animate>
        <VueFeather strokeWidth="0" size="48" type="shield" fill="white" />
        <header>
          <strong>Sign in to your account</strong>
          <span>The page you are trying to access requires authentication</span>
        </header>
        <hr />
        <span class="field">
          <VueFeather strokeWidth="1.5" size="32" type="user" />
          <v-input
            placeholder="E-mail address"
            :disabled="pending"
            v-model="params.email"
            required
          />
        </span>
        <span class="field">
          <VueFeather strokeWidth="1.5" size="32" type="key" />
          <v-input
            placeholder="Password"
            :disabled="pending"
            v-model="params.password"
            required
            type="password"
          />
        </span>
        <p class="error" v-if="error">
          <VueFeather strokeWidth="1.5" type="alert-triangle" size="24" />
          <span> {{ error }} </span>
        </p>
        <VButton type="submit" :disabled="disallowSubmit">
          <span class="inline-block">Sign In</span>
          <VueFeather type="chevrons-right" size="20" />
        </VButton>
      </form>

      <PendingOverlay v-if="pending" />
    </main>
  </div>
</template>
<style lang="scss">
.login-backdrop {
  background-color: rgba(0 0 0 / 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100dvw;
  height: 100dvh;
}

.login-window {
  @apply bg-black bg-opacity-90;

  //   border: 1px solid rgba(255 255 255 / 15%);
  //   @apply backdrop-filter backdrop-blur-lg;
  @apply rounded;
  @apply shadow-xl;

  @apply flex flex-col;
  //   @apply px-12 py-6 gap-4;

  //   min-width: 360px;

  justify-self: center;
  align-self: center;
  overflow: hidden;

  margin: auto;
}

.login-form {
  @apply px-32 py-24;
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(240px, 360px);
  align-items: center;

  column-gap: 1rem;
  row-gap: 1rem;
  font-size: 1rem;

  hr {
    grid-column: 2;
    opacity: 10%;
    // grid-column: 1 / -1;
  }

  header {
    display: flex;
    flex-direction: column;
    // gap: -8px;
    grid-column: 2;
    // grid-column: 1 / -1;
    font-size: 2rem;
    font-weight: 300;

    span {
      font-size: 0.875rem;
      font-weight: 400;
      //   color: rgba(255 0 48/ 100%);
      color: rgba(var(--rgb) / 100%);
      padding-left: 0.125rem;
      //   opacity: 75;
    }
  }
  .field {
    grid-column: 1 /-1;
    display: grid;
    grid-template-columns: subgrid;

    i {
      justify-self: flex-end;
      align-self: center;
    }
  }

  button {
    grid-column: 2;
  }
}

p.error {
  --rgb: 255 0 32;
  //   --color: gba(var(--rgb) / 15%);

  grid-column: 2;

  border-radius: 2px;
  color: rgba(var(--rgb) / 100%);
  background-color: rgba(var(--rgb) / 15%);

  @apply flex;
  @apply items-center justify-center;
  @apply px-4 py-2  gap-4;
}
</style>
