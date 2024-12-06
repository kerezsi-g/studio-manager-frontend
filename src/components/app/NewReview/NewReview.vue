<script setup lang="ts">
import { ref } from 'vue'
import { VButton } from '@/components/ui'

const props = defineProps<{ t: number }>()

const emit = defineEmits<{
  (c: 'resolve', p: string | null): void
  (c: 'reject'): void
}>()

const review = ref('')
</script>
<template>
  <form class="new-review-form" @submit.prevent="() => emit('resolve', review)">
    <header class="text-xl">Review</header>
    <textarea class="v-input" v-model="review" rows="6" />
    <footer class="flex gap-4 items-center justify-center">
      <VButton type="button" @click="() => emit('resolve', null)"> Cancel </VButton>
      <VButton type="submit"> OK </VButton>
    </footer>
  </form>
</template>
<style lang="scss">
.new-review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  min-width: 480px;

  @apply bg-black bg-opacity-80;
  @apply px-8 py-4;
}
</style>
