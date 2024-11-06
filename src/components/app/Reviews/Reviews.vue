<script setup lang="ts">
import type { core } from '@/api/api'
import { formatTimestamp } from '@/utils'

const props = defineProps<{
  data: core.Annotation[]
}>()
</script>
<template>
  <div id="annotations-list" class="panel surface-0 flex-grow">
    <header class="panel-header">
      <VueFeather type="list" size="24" strokeWidth="2" />
      <span> Reviews </span>
    </header>
    <ul class="markers-list">
      <li class="markers-list-item" v-for="annotation in props.data" :key="annotation.annotationId">
        <span class="timestamp"> {{ formatTimestamp(annotation.t) }} </span>
        <span> {{ annotation }} </span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
#annotations-list {
  @apply bg-black bg-opacity-80;
  @apply backdrop-filter backdrop-blur-md;
  @apply px-8 py-4;
  letter-spacing: 2px;
  display: flex;
  flex-direction: column;
  width: 512px;
  flex-shrink: 0;
}
</style>
