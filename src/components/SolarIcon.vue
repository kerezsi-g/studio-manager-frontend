<script lang="ts">
const SCOPE = 'solar'
const VARIANT = 'broken'
</script>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon: string
    variant?: 'broken' | 'line' | 'line-duotone' | 'linear' | 'outline' | 'bold' | 'bold-duotone'
  }>(),
  {
    variant: VARIANT,
  },
)

const iconString = computed(() => {
  return `${SCOPE}:${props.icon}-${props.variant}`
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

.icon-lg {
  font-size: 48px;
  g,
  path {
    line-height: normal;

    stroke-width: 1;
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

.icon-32 {
  font-size: 32px;
  g,
  path {
    line-height: normal;

    stroke-width: 1.5;
  }
}

.icon-sm {
  font-size: 16px;
  g,
  path {
    line-height: normal;

    stroke-width: 2;
  }
}
</style>
