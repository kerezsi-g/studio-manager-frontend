<route lang="json">
{
  "props": true,
  "name": "project-page-root"
}
</route>
<script setup lang="ts">
import { ReviewsList } from '@/components/app/ReviewsList'
import { ProjectReviews } from '@/components/data/ProjectReviews'

import { ProjectDetails } from '@/components/data'
import { RouterLink } from 'vue-router'
import AudioContext from '@/components/app/AudioContext/AudioContext.vue'
import { MediaControls, WaveformDisplay } from '@/components/app'
import Scrubber from '@/components/app/AudioPlayer/Scrubber.vue'
import Marker from '@/components/app/AudioPlayer/Marker.vue'
import ProjectFiles from '@/components/app/ProjectFiles/ProjectFiles.vue'
import { API } from '@/api/client'

const props = defineProps<{
  projectId: string
  fileId?: string
}>()

async function createReview(t: number) {
  const { fileId, projectId } = props

  return await API.createReview(projectId, { fileId: fileId!, t, content: 'test' })
}
</script>
<template>
  <div class="project-page-root">
    <ProjectDetails v-bind="{ projectId }" v-slot="{ data: project }">
      <aside class="flex flex-col">
        <header class="project-page-header">
          <RouterLink
            :to="{
              name: 'list-projects',
              params: {
                collectionId: project.collectionId
              }
            }"
          >
            <h2 class="flex items-center gap-1">
              <VueFeather type="folder" size="20" strokeWidth="1.5" />
              {{ project.collectionName }}
            </h2>
          </RouterLink>
          <h1>{{ project.projectName }}</h1>
        </header>
        <ProjectFiles v-bind="{ projectId }" :data="project.versions" />
      </aside>
      <main class="flex flex-col flex-grow">
        <ProjectReviews v-slot="{ data: reviews, reload }" v-bind="{ projectId }">
          <AudioContext v-bind="{ fileId }" v-slot="{ peaks, controls }" v-if="fileId">
            <div class="waveform-container" v-if="peaks !== null">
              <WaveformDisplay
                v-for="(channel, i) in peaks?.peaks"
                :bits="peaks.bits"
                :length="peaks.length"
                :peaks="channel"
                :key="i"
              />
              <Scrubber />
              <Marker
                v-for="review in reviews.filter((r) => !r.resolvedBy)"
                v-bind="review"
                :key="review.reviewId"
              />
            </div>
            <MediaControls @create-review="(t) => createReview(t).then(reload)" />
            <!-- <AudioPlayer v-bind="{ fileId }" :annotations="data" v-if="fileId" /> -->
            <!-- {{ controls.currentTime.value }} -->
            <ReviewsList
              :data="reviews"
              @reviewClicked="(review) => controls.seek(review.t - 1)"
              :current-time="controls.currentTime.value"
            />
          </AudioContext>
        </ProjectReviews>
      </main>
    </ProjectDetails>
  </div>
</template>
<style lang="scss">
.project-page-root {
  @apply bg-black bg-opacity-50;
  width: 100%;
  height: 100;
  flex-grow: 1;

  display: flex;

  --ch-height: 128px;
}

.project-page-header {
  //   height: 128px;
  @apply px-8 py-2;
  @apply self-stretch;
  @apply bg-black bg-opacity-50;

  h1 {
    @apply text-4xl;
    // @apply border-b;
    font-weight: 300;
  }

  h2 {
    @apply text-xl;
    // @apply ml-1;
    color: rgba(var(--rgb) / 100%);
    opacity: 0.8;
  }
}
</style>
