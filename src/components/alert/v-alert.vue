<script setup lang="ts">
import SolarIcon from '../SolarIcon.vue'

const props = defineProps<{
  title: string
  color: string
  icon: string
}>()
</script>
<template>
  <div class="v-alert" :class="`palette-${props.color}`">
    <div class="v-alert-icon">
      <SolarIcon :icon="props.icon" class="icon-32" variant="bold-duotone" />
    </div>
    <h3 class="v-alert-title">{{ props.title }}</h3>
    <div class="v-alert-message">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.v-alert {
  // display: flex;
  // flex-direction: row;
  gap: 0rem 1rem;
  padding: 0.5rem 1.5rem;

  background-color: rgba(var(--color-main) / 20%);
  border: 1px dashed rgba(var(--color-main) / 100%);
  // border-left: 6px solid rgba(var(--color-main) / 90%);

  background-image: linear-gradient(
    135deg,
    rgba(var(--color-main) / 5%) 25%,
    transparent 25%,
    transparent 50%,
    rgba(var(--color-main) / 5%) 50%,
    rgba(var(--color-main) / 5%) 75%,
    transparent 75%,
    transparent 100%
  );
  background-size: 19.8px 19.8px;

  // box-shadow: 0.05rem 0.1rem 0.5rem rgba(var(--color-main) / 25%);

  border-radius: 3px;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
}

.v-alert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 2rem;
  // height: 2rem;
  color: rgba(var(--color-main));
  text-shadow: 0 0 0.25rem rgba(var(--color-main) / 25%);
}

.v-alert-title {
  // font-weight: 600;
  font-size: 1.25rem;
  color: rgba(var(--color-main));
  text-shadow: 0 0 0.25rem rgba(var(--color-main) / 25%);
}

.v-alert-message {
  display: flex;
  flex-direction: column;
  font-size: 0.825rem;
  grid-column: 2;
}
</style>
