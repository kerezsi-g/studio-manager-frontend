<script setup lang="ts">
import type { PaletteKey } from '../Button'

withDefaults(
  defineProps<{
    size?: string
    thickness?: string | number
    icon?: string
    color?: PaletteKey
    // backdrop?: boolean
  }>(),
  {
    color: 'primary',
    size: '4em',
    thickness: 30,
  },
)
</script>
<template>
  <div class="spinner" :class="`palette-${color} apply-palette`">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 400 400"
      xml:space="preserve"
      :width="size"
      :height="size"
    >
      <path
        d=" M 350 200 A 150 150 0 0 1 125 330"
        :stroke-width="thickness ?? 30"
        stroke-linecap="round"
        fill="transparent"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 200 200"
          to="360 200 200"
          dur="600ms"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <span v-if="$slots.content || $slots.default" class="spinner-inside">
      <slot />
    </span>
  </div>
</template>
<style lang="css">
.spinner {
  position: relative;
}
.spinner svg path {
  stroke: currentColor;
  position: relative;
}

.spinner-inside {
  position: absolute;
  display: flex;
  inset: 0;
  justify-content: center;
  align-items: center;
}
</style>
