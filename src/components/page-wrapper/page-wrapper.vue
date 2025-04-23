<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
<template>
  <main class="page-wrapper">
    <header class="page-header">
      <h3 class="page-title">{{ title }}</h3>
      <slot name="actions" />
    </header>
    <hr class="page-divider" />
    <slot name="body" />
  </main>
</template>
<style lang="css">
.page-wrapper {
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: rgba(0 0 0 / 50%);
  overflow: hidden;
}

.page-divider {
  opacity: 0.3;
}

.page-header {
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 4rem;
  padding: 1rem 4rem;
  /* background-color: rgba(8 10 12 / 95%); */
}

.page-title {
  font-size: 3rem;
  flex-grow: 1;
  font-weight: 400;
}
</style>
