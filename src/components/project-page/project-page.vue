<script setup lang="ts">
import type { ProjectDetails } from '@/api-client'
import icons from '@/components/icons'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '../ui/Button'

defineProps<ProjectDetails>()
</script>
<template>
  <div class="project-page">
    <header class="project-page-header">
      <div class="project-avatar">
        <SolarIcon :icon="icons.projectType[projectType]" variant="bold-duotone" width="48" />
      </div>
      <div class="project-title">
        <h1>{{ projectName }}</h1>
        <h2>Type: {{ projectType }}</h2>
      </div>

      <VButton size="sm" color="error" variant="subdued" @click="() => $router.back()">
        <template #prefix>
          <SolarIcon icon="backspace" variant="bold" width="24" />
        </template>
        Leave
      </VButton>
    </header>
    <!-- <nav class="project-navigation">
      <span class="project-nav-link active"> Main </span>
      <span class="project-nav-link"> Gallery </span>
      <span class="project-nav-link"> Time tracking </span>
    </nav> -->
    <hr class="divider" />
    <div class="project-page-contents">
      <slot name />
    </div>
  </div>
</template>
<style lang="css">
@reference 'tailwindcss';

.project-page {
  display: flex;
  flex-direction: column;
  max-width: var(--page-width);
  width: 100%;
  margin-inline: auto;
  flex-grow: 1;
  box-shadow: 0 0 64px black;
  backdrop-filter: blur(8px);
  background-color: rgba(var(--surface) / 80%);

  overflow: hidden;
  /* background-color: rgba(0 0 0 / 70%); */
}

hr.divider {
  opacity: 0.25;
}

.project-page-contents {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(var(--surface-dark) / 50%);
}

.project-page-header {
  max-width: var(--page-width);

  /* justify-content: center; */

  display: flex;
  align-items: center;

  padding: 1rem 3rem;
  padding-bottom: 3rem;
  gap: 1rem;

  /* background-color: rgba(var(--surface-dark) / 98%); */
  /* backdrop-filter: blur(64px); */

  anchor-name: --project-navigation-anchor;
}

.project-avatar {
  @apply shadow-xl;
  /* border: 1px solid rgba(var(--color-text) / 50%); */

  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: rgba(var(--surface-dark) / 100%);
}

.project-title {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > h1 {
    font-size: 2rem;
  }

  > h2 {
    font-size: 1rem;
    padding-left: 0.25rem;
    opacity: 0.85;
  }
}

.project-navigation {
  display: flex;
  /* padding: 1rem 2rem; */
  padding-inline: 2rem;
  gap: 8px;
  position: absolute;
  position-anchor: --project-navigation-anchor;
  bottom: anchor(bottom);
  margin-bottom: -1px;
  /* justify-content: center; */

  /* margin-bottom: -3px; */
}

.project-nav-link {
  padding: 0.25rem 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 1.25rem;

  cursor: pointer;

  border-bottom: 3px solid transparent;

  z-index: 5;

  background-color: rgba(var(--surface-dark) / 50%);

  &:hover {
    color: rgba(var(--color-main) / 100%);
  }

  &.active {
    color: rgba(var(--color-main) / 100%);
    border-color: rgba(var(--color-main) / 100%);
    /* background-color: rgba(var(--color-main) / 25%); */
  }
}
</style>
