<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthGuard from './components/auth-guard/auth-guard.vue'
import { NavBar } from './components/nav-bar'
import { VModalOutlet } from './components/modal'
</script>

<template>
  <AuthGuard>
    <NavBar />
    <RouterView />
    <VModalOutlet />
  </AuthGuard>
</template>
<style lang="css">
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
