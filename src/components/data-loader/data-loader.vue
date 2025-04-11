<script lang="ts">
import type { LoaderOptions } from './composables/useLoader'

export interface LoaderProps<R, P> extends LoaderOptions<R, P> {
  args: P
  /**
   * Sets an interval in ms for automatically re-executing the provided function
   */
  poll?: number | null
  debounce?: number
}
</script>
<script setup lang="ts" generic="Results, Parameters">
import { onMounted, watch, computed } from 'vue'
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
