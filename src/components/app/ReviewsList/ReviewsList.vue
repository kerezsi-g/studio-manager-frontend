<script setup lang="ts">
import type { types } from '@/api/api'
import ListItem from '@/components/ui/ListItem/ListItem.vue'
import { Panel } from '@/components/ui/Panel'
import { formatTimestamp } from '@/utils'

const props = withDefaults(
  defineProps<{
    data: types.Review[]
    currentTime?: number
    highlightTolerance?: number
  }>(),
  {
    highlightTolerance: 2
  }
)

const emit = defineEmits<{
  (c: 'reviewClicked', v: types.Review): void
}>()

function isNear(r: types.Review) {
  if (props.currentTime === undefined) return false

  return Math.abs(r.t - props.currentTime) < props.highlightTolerance
}
</script>
<template>
  <Panel title="Reviews" class="reviews-list-root flex-grow" icon="message-square">
    <template #body>
      <ul class="reviews-list">
        <ListItem
          v-for="review in props.data"
          :key="review.reviewId"
          class="reviews-list-item"
          :icon="review.resolvedBy ? 'check-circle' : 'alert-circle'"
          :class="{
            resolved: review.resolvedBy,
            highlight: isNear(review)
          }"
          @click="() => emit('reviewClicked', review)"
        >
          <template #start>
            <span class="timestamp"> {{ formatTimestamp(review.t) }} </span>
          </template>
          <span> {{ review.content }} </span>
        </ListItem>
      </ul>
    </template>
  </Panel>
</template>
<style lang="scss">
.reviews-list-root {
  @apply px-8 py-4;
  //   @apply backdrop-filter backdrop-blur-md;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.reviews-list {
  @apply flex flex-col gap-2 overflow-auto;
}

.reviews-list-item {
  i {
    color: rgba(var(--rgb) / 100%);
  }

  &.resolved {
    --rgb: 0 192 0;
  }
}

.reviews-list-item.highlight {
  background-color: rgba(var(--rgb) / 20%);
  color: rgba(var(--rgb) / 100%);

  .timestamp {
    background-color: rgba(var(--rgb) / 50%);
    color: white;
    margin-left: 8px;
  }
}

.timestamp {
  @apply font-mono;
  @apply px-2;
  @apply rounded;
  @apply transition-all;
  font-size: 12px;
  font-weight: 300;

  letter-spacing: 1px;

  color: rgba(var(--rgb) / 100%);
  background-color: rgba(var(--rgb) / 15%);

  //   @apply text-sky-500;
  //   @apply bg-sky-500 bg-opacity-20;

  //   background-color: rgba(var(--rgb) / 20%);
  //   color: rgba(var(--rgb) / 100%);
  //   color: white;
}
</style>
