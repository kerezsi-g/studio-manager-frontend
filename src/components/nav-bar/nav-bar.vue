<script setup lang="ts">
import { useAuthentication } from '@/composables/use-authentication'
import VButton from '../ui/Button/v-button.vue'
import SolarIcon from '../SolarIcon.vue'

const { currentUser, signOut } = useAuthentication()
</script>
<template>
  <nav id="navbar">
    <header>Your Brand Here</header>

    <div class="user-info">
      <SolarIcon icon="user" class="icon-base" />
      <div class="user-info-details">
        <span class="username">{{ currentUser!.name }}</span>
        <span class="email">{{ currentUser!.email }}</span>
      </div>
    </div>
    <VButton color="error" variant="filled" @click="signOut">
      Sign Out
      <template #suffix>
        <SolarIcon icon="logout" class="icon-base" />
      </template>
    </VButton>
  </nav>
</template>
<style lang="scss">
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info-details {
  display: flex;
  flex-direction: column;
  line-height: normal;
}

.username {
  font-weight: 500;
  line-height: normal;
}

.email {
  font-size: 0.875rem;
  opacity: 0.75;
}

#navbar {
  --border: rgba(32 32 32 / 80%);
  width: 100%;
  padding: 1rem 3rem;
  background-color: rgba(3 3 3 / 75%);
  backdrop-filter: blur(16px);
  gap: 4rem;

  border-bottom: 1px solid var(--border);

  background-size: 10px 10px;

  display: flex;
  flex-direction: row;
  align-items: center;

  header {
    flex-grow: 1;
  }
}
</style>
