<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthGuard from './components/auth-guard/auth-guard.vue'
import { NavBar } from './components/nav-bar'
import { VModalGlide, VModalOutlet } from './components/modal'
</script>

<template>
  <AuthGuard>
    <NavBar />
    <main id="app-inner" class="palette-primary">
      <RouterView />
    </main>
    <VModalOutlet v-slot="dialog">
      <VModalGlide v-bind="dialog" />
    </VModalOutlet>
  </AuthGuard>
</template>
<style lang="css">
@reference 'tailwindcss';

#app-inner {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  --border: rgba(255 255 255 / 5%);
  background-image: linear-gradient(
    135deg,
    var(--border) 5%,
    transparent 5%,
    transparent 50%,
    var(--border) 50%,
    var(--border) 55%,
    transparent 55%,
    transparent 100%
  );

  background-size: 10px 10px;
}

#app {
  @apply transition-all;
  --blur: 4px;

  position: relative;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(var(--blur));
}

#app:has(.sign-in) {
  --blur: 0px;
}
</style>
