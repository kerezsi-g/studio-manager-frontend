<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps<{
  icon?: string
  title: string
}>()
</script>
<template>
  <div class="panel surface-0">
    <header class="panel-header">
      <VueFeather v-if="icon" :type="icon" size="24" strokeWidth="2" />
      <span>
        {{ title }}
      </span>
    </header>
    <slot name="body" />
  </div>
</template>
<style lang="scss">
.panel {
  @apply flex flex-col;
  @apply px-12 py-8 gap-8;
  @apply shadow-xl;
  @apply rounded-sm;
}

.panel-header {
  @apply text-4xl;
  @apply px-4 py-2 gap-4;
  @apply flex items-center;
  @apply text-white;
  //   @apply uppercase;
  font-weight: 200;

  border-bottom: 1px solid;
  border-color: rgba(var(--rgb) / 100%);
  //   color: rgba(var(--rgb) / 100%);;
}
</style>
