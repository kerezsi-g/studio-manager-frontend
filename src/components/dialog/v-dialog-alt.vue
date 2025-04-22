<script setup lang="ts">
import SolarIcon from '../SolarIcon.vue'

const props = defineProps<{
  title?: string
  color: string
  subtitle?: string
  icon?: string
}>()
</script>
<template>
  <div class="v-dialog" :class="`palette-${props.color}`">
    <slot name="top" />
    <h3 v-if="title" class="v-dialog-title">
      <SolarIcon
        v-if="icon"
        :icon="icon"
        class="icon-lg apply-palette palette-info v-dialog-icon"
        variant="bold-duotone"
      />
      <span>{{ title }}</span>
    </h3>
    <hr class="v-dialog-divider" />

    <!-- <h3 v-if="subtitle">{{ subtitle }}</h3> -->
    <main class="v-dialog-body">
      <slot name="body" />
    </main>
    <!-- <hr class="v-dialog-divider" /> -->
    <footer class="v-dialog-footer">
      <slot name="actions" />
    </footer>
  </div>
</template>
<style lang="scss">
@reference "tailwindcss";

.v-dialog {
  @apply shadow-lg;

  color: rgba(var(--color-text));

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 4rem;

  // border: 1px solid rgba(255 255 255 / 15%);
  // border-top: 8px solid rgba(var(--color-main) / 40%);

  // backdrop-filter: blur(24px);
  border-radius: 3px;
  background-color: rgba(var(--surface) / var(--surface-opacity));

  .v-dialog-title {
    font-weight: 500;
    font-size: 2rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    // background-color: rgba(0 0 0 / 30%);
    width: 100%;
    // padding: 0.5rem 4rem;
    // text-align: center;
  }

  .v-dialog-divider {
    width: 100%;
    color: white;
    // color: rgba(var(--color-main) / 100%);
    opacity: 25%;
  }

  .v-dialog-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    width: 100%;
  }

  .v-dialog-footer {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    // width: 100%;
  }
}
</style>
