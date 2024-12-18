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
import { CoreAPI } from '@/api/client'
import { useModal } from '@/components/ui/ModalOutlet'
import NewReview from '@/components/app/NewReview/NewReview.vue'
import { ref } from 'vue'
import MediaFile from '@/components/data/MediaFile/MediaFile.vue'

const props = defineProps<{
  projectId: string
  fileId?: string
}>()

async function createReview(t: number, e?: MouseEvent) {
  const { fileId, projectId } = props

  const content = await useModal(NewReview, { t }, { e })

  if (!content) return null

  return await CoreAPI.createReview(projectId, { fileId: fileId!, t, content })
}

interface PlayerState {
  playing: boolean
  timestamp: number
}

const fileSwitchState = ref<PlayerState>()

function handleFileSwitch(st: PlayerState) {
  console.log(st)

  fileSwitchState.value = st
}
</script>
<template>
  <div class="project-page-root">
    <ProjectDetails v-bind="{ projectId }" v-slot="{ data: project }">
      <Teleport to="#navbar-slot">
        <header class="project-page-header">
          <RouterLink
            class="link flex items-center gap-2"
            :to="{
              name: 'list-projects',
              params: {
                collectionId: project.collectionId
              }
            }"
          >
            <VueFeather type="folder" size="20" strokeWidth="1" />
            <span>{{ project.collectionName }}</span>
          </RouterLink>
          /
          <strong>{{ project.projectName }}</strong>
        </header>
      </Teleport>
      <aside class="flex flex-col">
        <ProjectFiles v-bind="{ projectId }" :data="project.versions" />
      </aside>
      <main class="flex flex-col flex-grow">
        <ProjectReviews v-slot="{ data: reviews, reload }" v-bind="{ projectId }">
          <MediaFile :fileId="fileId" v-slot="{ peaks, token }" v-if="fileId">
            <AudioContext
              :key="token"
              :initial-state="fileSwitchState"
              :access-token="token"
              v-slot="{ controls }"
              v-if="token"
              @unmount="handleFileSwitch"
            >
              <div class="waveform-container" v-if="peaks !== null">
                <WaveformDisplay
                  v-for="(channel, i) in peaks?.peaks"
                  fileSwitchState
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
              <MediaControls
                @create-review="
                  (t, e) =>
                    createReview(t, e).then((result) => {
                      if (result) reload()
                    })
                "
              />
              <!-- <AudioPlayer v-bind="{ fileId }" :annotations="data" v-if="fileId" /> -->
              <!-- {{ controls.currentTime.value }} -->
              <ReviewsList
                :data="reviews"
                @reviewClicked="(review) => controls.seek(review.t - 1)"
                :current-time="controls.currentTime.value"
              />
            </AudioContext>
          </MediaFile>
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
  @apply flex items-center;
  @apply bg-black bg-opacity-50;
  @apply gap-2;
  @apply text-lg;
  //   height: 128px;
  //   @apply px-8 py-2;
  //   @apply self-stretch;
}

a.link {
  color: rgba(var(--rgb) / 100%);
  padding-inline: 4px;
  border-radius: 2px;
  //   line-height: unset;

  &:hover {
    background-color: rgba(var(--rgb) / 10%);
  }
}
</style>
