<script setup lang="ts">
import type { core } from '@/api/api'
// import dayjs from 'dayjs'

defineProps<core.Project>()
</script>
<template>
  <RouterLink
    :to="{
      name: 'view-project',
      params: { projectId }
    }"
  >
    <li class="projects-list-item">
      <VueFeather
        type="folder"
        size="48"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1"
      />

      <h6>
        {{ projectName }}
      </h6>
    </li>
  </RouterLink>
</template>
<style lang="scss">
.projects-list-item {
  @apply flex;
  @apply px-4 py-2 gap-4;
  @apply items-center justify-start;

  //   @apply rounded-lg;

  //   @apply bg-white bg-opacity-20;
  //   @apply backdrop-filter backdrop-blur;

  @apply transition-all;

  cursor: pointer;

  //   border: 1px solid currentColor;

  &:hover {
    color: rgba(var(--rgb) / 100%);
    background-color: rgba(var(--rgb) / 10%);
  }

  h6 {
    @apply text-2xl;
    font-weight: 300;
  }
}
</style>
