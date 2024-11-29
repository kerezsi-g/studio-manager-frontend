<script setup lang="ts">
import { currentUser, signOut } from '@/composables/useAuthentication'
import { BrandLogo } from '../'
import { VButton } from '@/components/ui'

// const props = defineProps<{}>()
</script>
<template>
  <nav id="navbar" v-if="currentUser">
    <RouterLink
      :to="{
        name: 'collections-list'
      }"
      class="contents"
    >
      <BrandLogo />
    </RouterLink>

    <div id="navbar-slot"></div>

    <div id="user-info">
      <span> Logged in as: </span>
      <strong>
        {{ currentUser.email }}
      </strong>
    </div>

    <VButton class="color-error" :action="signOut">
      Sign Out
      <VueFeather type="log-out" size="16" />
    </VButton>
  </nav>
</template>
<style lang="scss">
#navbar-slot {
  @apply flex;
  @apply flex-grow;
  @apply items-center;
}

#navbar {
  background-color: rgba(0 2 4 / 100%);
  display: flex;
  flex-direction: row;
  align-items: center;

  @apply px-12 py-2 gap-8;
  //   @apply backdrop-filter backdrop-blur-md;
}

#user-info {
  @apply flex;
  @apply items-center;
  @apply gap-2;
}
</style>
