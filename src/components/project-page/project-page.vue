<script setup lang="ts">
import icons from '@/components/icons'
import SolarIcon from '../SolarIcon.vue'
import { VButton } from '@/components/ui/Button'
import { computed, ref } from 'vue'
import { useProjectData } from '@/pages/projects/[projectId].vue'
import { useModal } from '../modal'
import RenameProjectDialog from '../rename-project-dialog/rename-project-dialog.vue'

const { data, reload } = useProjectData()

function wrapUrl(url: string) {
  return `url('${url}')`
}

const thumbnailUrl = computed(() => {
  const asset = data.value?.assets.find((f) => f.assetType === 'thumbnail')
  return asset ? wrapUrl(`/api/files/${asset.fileId}/thumbnail`) : undefined
})

const backgroundImageUrl = computed(() => {
  const asset = data.value?.assets.find((f) => f.assetType === 'background-image')
  return asset ? `/api/files/${asset.fileId}` : undefined
})

async function handleRename(e: MouseEvent) {
  const project = data.value

  if (!project) {
    return
  }

  const result = await useModal(
    RenameProjectDialog,
    {
      projectId: project.projectId,
      currentName: project.projectName,
    },
    { e },
  )

  if (result) {
    reload()
  }
}

const bgLoaded = ref(false)

const navLinks = computed(() => {
  const mainIcon = data.value ? icons.projectType[data.value.projectType] : ''

  return [
    {
      name: 'project-main',
      icon: mainIcon,
      label: 'Main',
    },
    {
      name: 'project-gallery',
      icon: 'gallery-wide',
      label: 'Gallery',
    },
    {
      name: 'project-assets',
      icon: 'folder-path-connect',
      label: 'Storage',
    },
  ]
})
</script>
<template>
  <img
    v-if="backgroundImageUrl"
    class="project-custom-bg"
    :class="{ loaded: bgLoaded }"
    :src="backgroundImageUrl"
    @load="bgLoaded = true"
  />
  <div class="project-page">
    <header class="project-page-header">
      <main>
        <header class="project-title">
          <div
            class="project-title-img"
            :style="{
              'background-image': thumbnailUrl,
            }"
          >
            <SolarIcon
              v-if="data && !thumbnailUrl"
              :icon="icons.projectType[data.projectType]"
              variant="bold-duotone"
              width="48"
            />
          </div>
          <div class="project-title-text">
            <h1>
              {{ data?.projectName }}

              <button class="icon-button" @click="handleRename">
                <SolarIcon icon="pen-2" variant="bold" width="20" />
              </button>
            </h1>
            <hr class="divider" />
            <h2>{{ data?.subject }}</h2>
          </div>
        </header>

        <RouterLink :to="{ name: 'projects-list' }">
          <VButton size="sm" color="error" variant="subdued">
            <template #prefix>
              <SolarIcon icon="backspace" variant="bold" width="24" />
            </template>
            Leave
          </VButton>
        </RouterLink>
      </main>

      <nav class="project-navigation">
        <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          class="project-nav-link"
          active-class="active"
          :to="{ name: link.name, replace: true }"
        >
          <SolarIcon :icon="link.icon" variant="bold-duotone" width="24" />
          {{ link.label }}
        </RouterLink>
      </nav>
    </header>

    <hr class="divider" />

    <div class="project-page-contents">
      <slot />
    </div>
  </div>
</template>
<style lang="css">
@reference 'tailwindcss';

.project-page {
  display: flex;
  flex-direction: row;
  /* max-width: var(--page-width, 1600px); */
  width: 100%;
  margin-inline: auto;
  flex-grow: 1;
  box-shadow: 0 0 64px black;
  backdrop-filter: blur(8px);

  overflow: hidden;
  /* background-color: rgba(0 0 0 / 70%); */

  background-size: cover;
  background-position: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

hr.divider {
  opacity: 0.25;
}

.project-page-contents {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(var(--surface-dark) / 65%);
}

.project-page-header {
  background-color: rgba(var(--surface) / 50%);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  > main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;
    gap: 1rem;
  }

  > nav {
    display: flex;
    flex-direction: column;
    /* padding-inline: 4rem; */
    gap: 8px;
    background-color: rgba(var(--surface-dark) / 50%);

    @media (max-width: 1024px) {
      flex-direction: row;
    }
  }
}

.project-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.project-title-img {
  @apply shadow-xl;
  /* border: 1px solid rgba(var(--color-text) / 50%); */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  z-index: 1;

  background-position: center;
  background-size: cover;

  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: rgba(var(--surface-dark) / 100%);
}

/* TODO: move elsewhere */
button.icon-button {
  @apply transition-all;
  opacity: 0.8;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.project-title-text {
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */

  background-color: rgba(var(--surface-dark) / 50%);
  padding: 0.25rem 2rem;
  margin-left: -2rem;
  margin-right: auto;

  border-radius: 3px;
  @apply shadow-md;

  > h1 {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 1px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
  }

  > h2 {
    display: flex;
    flex-direction: row;
    align-items: baseline;

    text-transform: capitalize;

    font-size: 1rem;
    padding-left: 0.25rem;
    gap: 1rem;

    opacity: 0.85;
  }
}

.project-nav-link {
  @apply transition-all;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;

  font-size: 1.125rem;
  font-weight: 500;

  border-right: 3px solid;
  border-color: var(--border-color, transparent);

  z-index: 5;

  &:hover {
    color: rgba(var(--color-main) / 100%);
  }

  &.active {
    color: rgba(var(--color-main) / 100%);
    background-color: rgba(var(--surface-dark) / 25%);
    --border-color: rgba(var(--color-main) / 100%);
    /* margin-bottom: -1px; */
  }

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 3px solid var(--border-color, transparent);
    margin-bottom: -1px;
    flex-grow: 1;
  }
}

.project-custom-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  z-index: -1;
  object-fit: cover;
  object-position: center;
  opacity: 0;

  transition: opacity 0.25s ease-out;

  &.loaded {
    opacity: 1;
  }
}
</style>
