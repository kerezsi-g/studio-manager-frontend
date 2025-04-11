<script lang="ts">
const SCOPE = 'solar'
const VARIANT = 'broken'
</script>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps<{
  icon: string
}>()

const iconString = computed(() => {
  return `${SCOPE}:${props.icon}-${VARIANT}`
})
</script>
<template>
  <Icon :icon="iconString" />
</template>
<style lang="scss">
.icon-xl {
  font-size: 96px;
  g,
  path {
    line-height: normal;

    stroke-width: 0.75;
  }
}

.icon-base {
  font-size: 24px;
  g,
  path {
    line-height: normal;

    stroke-width: 1.5;
  }
}
</style>
