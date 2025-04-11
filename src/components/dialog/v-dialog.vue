<script setup lang="ts">
const props = defineProps<{
  title: string
  color: string
}>()
</script>
<template>
  <div class="dialog-outer" :class="`palette-${props.color}`">
    <header class="dialog-title">{{ title }}</header>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: rgba(16 20 24 / 80%);
  border-radius: 3px;

  @apply shadow-xl;
}

.dialog-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 4rem;

  color: rgba(var(--color-text));
}

.dialog-title {
  background-color: rgba(0 0 0 / 80%);
  color: rgba(var(--color-text));
  font-size: 2rem;
  font-weight: 400;
  padding: 0.75rem 3rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background-color: rgba(0 0 0 / 60%);
}
</style>
