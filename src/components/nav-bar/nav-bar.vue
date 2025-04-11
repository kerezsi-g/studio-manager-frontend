<script setup lang="ts">
import { useAuthentication } from '@/composables/use-authentication'
import VButton from '../ui/Button/v-button.vue'
import SolarIcon from '../SolarIcon.vue'

const { currentUser, signOut } = useAuthentication()
</script>
<template>
  <nav id="navbar">
    <header>Your Brand Here</header>
    <div>
      <VButton color="error" variant="filled" @click="signOut">
        Sign Out
        <template #suffix>
          <SolarIcon icon="logout" class="icon-base" />
        </template>
      </VButton>
    </div>
  </nav>
</template>
<style lang="scss">
#navbar {
  --border: rgba(32 32 32 / 80%);
  width: 100%;
  padding: 1rem 3rem;
  background-color: rgba(3 3 3 / 75%);
  backdrop-filter: blur(16px);
  // background-image: linear-gradient(
  //   135deg,
  //   var(--border) 5%,
  //   transparent 5%,
  //   transparent 50%,
  //   var(--border) 50%,
  //   var(--border) 55%,
  //   transparent 55%,
  //   transparent 100%
  // );

  border-bottom: 1px solid var(--border);

  background-size: 10px 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
