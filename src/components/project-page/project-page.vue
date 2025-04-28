<script setup lang="ts">
import type { ProjectDetails } from '@/api-client'
import icons from '@/components/icons'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '../ui/Button'
import { computed } from 'vue'

const props = defineProps<ProjectDetails>()

function wrapUrl(url: string) {
  return `url('${url}')`
}

const thumbnailUrl = computed(() => {
  const file = props.files.find((f) => f.tag === 'thumbnail')

  return file ? wrapUrl(`/api/files/${file.sha256}`) : undefined
})

const backgroundImageUrl = computed(() => {
  const file = props.files.find((f) => f.tag === 'background-image')

  return file ? wrapUrl(`/api/files/${file.sha256}`) : undefined
})
</script>
<template>
  <div
    v-if="backgroundImageUrl"
    class="project-custom-bg"
    :style="{ 'background-image': backgroundImageUrl }"
  />
  <div class="project-page">
    <header class="project-page-header">
      <div
        class="project-avatar"
        :style="{
          'background-image': thumbnailUrl,
        }"
      >
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
  max-width: var(--page-width, 1280px);
  width: 100%;
  margin-inline: auto;
  flex-grow: 1;
  box-shadow: 0 0 64px black;
  backdrop-filter: blur(8px);

  overflow: hidden;
  /* background-color: rgba(0 0 0 / 70%); */

  background-size: cover;
  background-position: center;
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
  background-color: rgba(var(--surface) / 50%);

  /* justify-content: center; */

  display: flex;
  align-items: center;

  padding: 1rem 3rem;
  /* padding-bottom: 4rem; */
  gap: 1rem;

  /* background-color: rgba(var(--surface-dark) / 98%); */
  /* backdrop-filter: blur(64px); */

  anchor-name: --project-navigation-anchor;
}

.project-avatar {
  @apply shadow-xl;
  /* border: 1px solid rgba(var(--color-text) / 50%); */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  background-position: center;
  background-size: cover;

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
  /* justify-content: center; */
  padding-inline: 2rem;
  gap: 8px;
  /* position: absolute; */
  position-anchor: --project-navigation-anchor;
  bottom: anchor(bottom);

  /* margin-bottom: -1px; */
  /* justify-content: center; */

  /* margin-bottom: -3px; */
}

.project-nav-link {
  padding: 0.25rem 2rem;
  font-weight: 500;
  /* letter-spacing: 1px; */
  font-size: 1.125rem;

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

.project-custom-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: -1;
}
</style>
