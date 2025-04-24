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
    <VButton color="error" variant="filled" @click="signOut" size="sm">
      Sign Out
      <template #suffix>
        <SolarIcon icon="logout" class="icon-base" />
      </template>
    </VButton>
  </nav>
</template>
<style lang="scss">
#navbar {
  --border: rgba(32 32 32 / 80%);
  width: 100%;
  padding: 0.75rem 3rem;
  background-color: rgba(var(--surface-dark));
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

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info-details {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.username {
  font-weight: 500;
  line-height: normal;
}

.email {
  font-size: 0.875rem;
  opacity: 0.75;
}
</style>
