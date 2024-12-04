<script setup lang="ts">
// import { NavBar } from '@/components/app'
// import Background from '@/components/app/Background/Background.vue'
import NavBar from './components/app/NavBar/NavBar.vue'
import SignIn from './components/app/SignIn/SignIn.vue'
import { VModalOutlet } from './components/ui/ModalOutlet'
import VModalGlide from './components/ui/ModalOutlet/animations/v-modal-glide.vue'
import { useAuthentication, currentUser } from './composables/useAuthentication'

const { pending } = useAuthentication()
</script>
<template>
  <main id="inner">
    <template v-if="pending"></template>
    <template v-else-if="currentUser">
      <NavBar />
      <RouterView />
    </template>
    <template v-else>
      <SignIn />
    </template>
    <VModalOutlet v-slot="state">
      <VModalGlide v-bind="state" />
    </VModalOutlet>
  </main>
</template>
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
html {
  height: 100%;
  width: 100%;
  font-family: 'Barlow';
  @apply text-white;
}

:root {
  //   --rgb: 190 210 230; //desaturated
  //   --rgb: 56 189 248; // blueish
  //   --rgb: 245 158 11; // amber
  //   --rgb: 132 204 22; // lime
  //   --rgb: 34 197 94; // green
  //   --rgb: 16 185 129; // emerald
  //   --rgb: 20 184 166; // teal
  //   --rgb: 14 165 233; // sky
  //   --rgb: 233 16 48; // red
  //   --rgb: 124 58 237; // purps
  --rgb: 6 182 212; // cyan
}

#app {
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  background-image: url('/img/background.jpg');
  background-size: cover;
  background-position: center center;
  //   background-clip: border-box;
}

.surface-0 {
  @apply bg-black bg-opacity-85;
}

.color-error {
  --rgb: 255 0 32;
}

.color-info {
  --rgb: 0 128 255;
}

#inner {
  @apply flex flex-col  flex-grow;
  //   @apply items-center justify-center;
  //   @apply backdrop-filter backdrop-blur-lg;
}
</style>
