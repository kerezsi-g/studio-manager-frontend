<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
<template>
  <section class="list">
    <header>
      <h1>{{ title }}</h1>
      <slot name="actions" />
    </header>
    <ul v-auto-animate>
      <slot name="items" />
    </ul>
  </section>
</template>
<style lang="css">
section.list {
  display: flex;
  flex-direction: column;

  padding: 1rem 2rem;
  gap: 0.5rem;

  > header {
    display: flex;
    align-items: center;

    padding: 0.25rem 0.5rem;
    gap: 1rem;

    text-transform: uppercase;

    > h1 {
      flex-grow: 1;
      font-size: 1.25rem;
      font-weight: 500;
    }
  }

  > ul {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    flex-grow: 1;
  }
}
</style>
