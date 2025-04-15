<script setup lang="ts">
import SolarIcon from '../SolarIcon.vue'

const props = defineProps<{
  title: string
  color: string
  icon?: string
}>()
</script>
<template>
  <div class="dialog-outer" :class="`palette-${props.color}`">
    <header class="dialog-title">
      <SolarIcon v-if="icon" :icon="icon" class="icon-base" />
      <span>
        {{ title }}
      </span>
    </header>
    <div class="dialog-body">
      <slot name="body" />
    </div>
    <footer class="dialog-actions">
      <slot name="actions" />
    </footer>
  </div>
</template>
<style lang="scss">
@reference 'tailwindcss';
.dialog-outer {
  @apply shadow-lg;
  position: relative;
  display: flex;
  flex-direction: column;

  background-color: oklch(15% 0.005 285.823 / 50%);
  border: 1px solid oklch(35% 0.017 285.786);

  border-radius: 3px;
}

.dialog-outer.padded {
  --dialog-padding: 2rem;
}

.dialog-body {
  border-block: 1px solid oklch(35% 0.017 285.786);
  padding: var(--dialog-padding);

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;

  color: rgba(var(--color-text));
  background-color: oklch(15% 0.005 285.823 / 75%);
}

.dialog-title {
  background-color: oklch(15% 0.005 285.823 / 50%);

  color: rgba(var(--color-text));
  font-size: 2rem;
  font-weight: 400;
  padding: 0.75rem 2rem;
  gap: 1rem;

  display: flex;
  align-items: center;
}

.dialog-actions {
  background-color: oklch(15% 0.005 285.823 / 50%);

  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.75rem 1rem;
  // background-color: rgba(0 0 0 / 60%);
}
</style>
