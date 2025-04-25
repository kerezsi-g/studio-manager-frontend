<script lang="ts">
import type { LoaderOptions } from './composables/useLoader'
import { inject } from 'vue'

export interface LoaderProps<R, P> extends LoaderOptions<R, P> {
  args: P
  /**
   * Sets an interval in ms for automatically re-executing the provided function
   */
  poll?: number | null
  debounce?: number
  injectKey?: string
}

interface DataLoaderContext<T> {
  data: T | null
  pending?: boolean
  reload: () => PromiseLike<void> | void
}

export function useDataLoader<T>(injectKey: string) {
  const ctx = inject<DataLoaderContext<T>>(injectKey)

  if (!ctx) {
    throw new Error(`No context found for key: ${injectKey}`)
  }

  return ctx
}
</script>
<script setup lang="ts" generic="Results, Parameters">
import { onMounted, watch, computed, provide } from 'vue'
import { shallowEquals } from '@/utils/object'
import { debounce as debounceFn } from '@/utils/debounce'
import { useLoader } from './composables/useLoader'

type Props = LoaderProps<Results, Parameters>

const props = withDefaults(defineProps<Props>(), {
  poll: null,
  fallback: null,
})

const emit = defineEmits<{
  (c: 'loaded', v: Results): unknown
}>()

const { data, pending, error, load, onLoad, executionCount } = useLoader(props)

onMounted(() => {
  load(props.args)
})

const reload = computed(() => {
  const baseFn = () => load(props.args)
  const debouncedFn = props.debounce ? debounceFn(baseFn, props.debounce) : baseFn
  return debouncedFn
})
if (props.injectKey) {
  provide<DataLoaderContext<Results>>(props.injectKey, {
    data: data.value,
    pending: pending.value,
    reload: reload.value,
  })
}

watch(
  () => props.args,
  (newValue, oldValue) => {
    if (!shallowEquals(newValue, oldValue)) reload.value()
  },
)

onLoad((data) => {
  emit('loaded', data)

  if (props.poll) {
    setTimeout(() => reload.value(), props.poll)
  }
})

watch(
  () => props.poll,
  (newValue, oldValue) => {
    if (oldValue === null && newValue !== null) {
      reload.value()
    }
  },
)
</script>
<template>
  <slot v-bind="{ data, pending, error, executionCount, reload }" />
  <slot name="data" v-if="data !== null" v-bind="{ data, reload }" />
  <slot name="pending" v-if="pending" v-bind="{ reload }" />
  <slot name="error" v-if="error" v-bind="{ error, reload }" />
</template>
