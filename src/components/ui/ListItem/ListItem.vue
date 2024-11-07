<script setup lang="ts">
const props = defineProps<{
  icon?: string
}>()
</script>
<template>
  <li class="list-item-outer">
    <VueFeather
      v-if="icon"
      :type="icon"
      size="24"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="1.5"
    />
    <slot name="start" />
    <div class="list-item-main">
      <slot />
    </div>
    <div>
      <slot name="end" />
    </div>
  </li>
</template>
<style lang="scss">
.list-item-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
}

.list-item-outer {
  @apply flex;
  @apply items-center justify-start;
  @apply px-4 py-2 gap-4;

  @apply transition-all;

  cursor: pointer;

  border-left: 2px solid transparent;

  &:hover {
    color: rgba(var(--rgb) / 100%);
    background-color: rgba(var(--rgb) / 10%);
    border-color: rgba(var(--rgb) / 100%);

    @apply pl-5 pr-3;
  }

  h6 {
    @apply text-2xl;
    font-weight: 300;
  }
}

.router-link-exact-active .list-item-outer {
  @apply pl-5 pr-3;
  color: rgba(var(--rgb) / 100%);
  //   color: white;
  background-color: rgba(var(--rgb) / 25%);
  border-color: rgba(var(--rgb) / 100%);
}
</style>
