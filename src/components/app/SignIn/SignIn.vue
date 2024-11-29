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
        <header>
          <VueFeather strokeWidth="0" size="48" type="shield" fill="white" />
          <p>
            <strong>Sign in to your account</strong>
            <span>The page you are trying to access requires authentication</span>
          </p>
        </header>
        <hr />

        <div class="msg color-info">
          <VueFeather type="info" size="24" />
          <div>
            The application is still in demo mode.<br />The following test accounts are available
            for signing in:<br />
            <div class="flex flex-row gap-2 text-xs font-mono">
              <span class="px-1 bg-black bg-opacity-30">test1:test</span>
              <span class="px-1 bg-black bg-opacity-30">test2:test</span>
              <span class="px-1 bg-black bg-opacity-30">test3:test</span>
            </div>
          </div>
        </div>

        <span class="field">
          <!-- <VueFeather strokeWidth="1.5" size="32" type="user" /> -->
          <v-input
            placeholder="E-mail address"
            label="E-mail address"
            :disabled="pending"
            v-model="params.email"
            required
          />
        </span>
        <span class="field">
          <!-- <VueFeather strokeWidth="1.5" size="32" type="key" /> -->
          <v-input
            placeholder="Password"
            label="Password"
            :disabled="pending"
            v-model="params.password"
            required
            type="password"
          />
        </span>
        <div class="msg color-error" v-if="error">
          <VueFeather strokeWidth="1.5" type="alert-triangle" size="24" />
          <span> {{ error }} </span>
        </div>
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
  display: flex;
  flex-direction: column;
  align-items: stretch;

  //   column-gap: 1rem;
  row-gap: 1rem;
  font-size: 1rem;

  hr {
    grid-column: 2;
    opacity: 10%;
    // grid-column: 1 / -1;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: 2rem;
    gap: 0.5rem;
    font-weight: 300;

    p {
      display: flex;
      flex-direction: column;
    }

    span {
      font-size: 0.875rem;
      font-weight: 400;
      //   color: rgba(255 0 48/ 100%);
      color: rgba(var(--rgb) / 100%);
      padding-left: 0.125rem;
    }
  }
  //   .field {
  // grid-column: 1 /-1;
  // display: grid;
  // grid-template-columns: subgrid;

  // i {
  //   justify-self: flex-end;
  //   align-self: center;
  // }
  //   }
}

.msg {
  //   --rgb: 255 0 32;
  //   --color: gba(var(--rgb) / 15%);

  grid-column: 2;

  border-radius: 2px;
  color: rgba(var(--rgb) / 100%);
  background-color: rgba(var(--rgb) / 15%);

  @apply flex;
  @apply items-center justify-start;
  @apply px-4 py-2  gap-4;
}
</style>
