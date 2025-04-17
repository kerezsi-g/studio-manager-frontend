<script setup lang="ts">
import type { Project } from '@/api-client'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'
import SolarIcon from '../SolarIcon.vue'

const props = defineProps<Project>()

const formattedDate = computed(() => {
  return dayjs(props.createdAt).format('YYYY-MM-DD')
})

const routeTo = computed(() => {
  return {
    name: 'project',
    params: { projectId: props.projectId },
  }
})
</script>
<template>
  <li class="grid-list-item">
    <router-link :to="routeTo" class="folder-link">
      <span>
        <Icon icon="fxemoji:folder" width="96" />
      </span>
      <h4>
        <SolarIcon icon="calendar-minimalistic" class="icon-sm" />
        {{ formattedDate }}
      </h4>
      <h3>{{ projectName }}</h3>
    </router-link>
  </li>
</template>
<style lang="scss"></style>
