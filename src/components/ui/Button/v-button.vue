<script lang="ts">
export type ButtonVariant = 'filled' | 'subdued' | 'outlined' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type PaletteKey = 'success' | 'warning' | 'info' | 'error' | 'primary' | 'secondary'

export interface ButtonProps<T> {
  color?: PaletteKey
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  square?: boolean
  action?: (e: MouseEvent, v?: T) => Promise<unknown>
  value?: T
}
</script>
<script setup lang="ts" generic="T">
import { ref } from 'vue'
import { VSpinner } from '../Spinner'

const props = withDefaults(defineProps<ButtonProps<T>>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
})

const pending = ref(false)

const emit = defineEmits<{
  (c: 'click', e: MouseEvent, v: T): unknown
}>()

function handleClick(e: MouseEvent) {
  if (props.disabled || pending.value) return

  if (props.action) {
    pending.value = true
    props.action(e, props.value).finally(() => {
      pending.value = false
    })
  } else {
    emit('click', e, props.value!)
  }
}
</script>
<template>
  <button
    @click="handleClick"
    :disabled="disabled || pending"
    class="v-button"
    :class="[variant, `palette-${color}`, size, disabled, { square }]"
    type="button"
  >
    <slot name="prefix" />
    <span v-if="$slots.default">
      <slot />
    </span>

    <slot name="suffix" />
  </button>
</template>
<style lang="css">
@reference 'tailwindcss';

button.v-button {
  --btn-border-width: 1px;
  --btn-border-radius: 2px;
  --btn-ring: 2px;
  --btn-ring-alpha: 40%;
  @apply transition-all;
  @apply gap-2;

  border-radius: var(--btn-border-radius);
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--btn-padding, 0.5em 1em);

  user-select: none;
  cursor: pointer;

  outline-width: 0;
  outline-color: rgba(var(--color-main) / 100%);
  outline-offset: calc(var(--btn-border-width) * -1);

  &.square {
    border-radius: 0;
  }

  &.sm {
    font-size: 0.825rem;
  }

  &.filled {
    @apply shadow-sm;
    --bg-alpha: 100%;

    background-color: rgba(var(--color-main) / var(--bg-alpha));
    color: rgba(var(--color-text) / var(--bg-alpha));

    /*  background: linear-gradient( */
    /*    rgba(var(--color-main) / var(--bg-alpha)), */
    /*    rgba(var(--color-dark) / var(--bg-alpha)) */
    /*  ); */

    &:hover {
      @apply shadow-md;
      background-color: rgba(var(--color-accent) / var(--bg-alpha));

      /* background: linear-gradient( */
      /* rgba(var(--color-accent) / var(--bg-alpha)), */
      /* rgba(var(--color-main) / var(--bg-alpha)) */
      /* ); */
    }

    &:active {
      box-shadow: 0 0 0 var(--btn-ring) rgba(var(--color-main) / var(--btn-ring-alpha));
    }
  }

  &.outlined {
    --bg-alpha: 0%;
    outline: var(--btn-border-width) solid rgba(var(--color-main) / 100%);
    color: rgba(var(--color-main) / 100%);
    background-color: rgba(var(--color-main) / var(--bg-alpha));

    &:hover {
      --bg-alpha: 80%;
      color: rgba(var(--color-text) / var(--bg-alpha));
    }

    &:active {
      --bg-alpha: 100%;
      box-shadow: 0 0 0 var(--btn-ring) rgba(var(--color-main) / var(--btn-ring-alpha));
    }
  }

  &.subdued {
    --bg-alpha: 40%;
    --btn-ring-alpha: 30%;
    background-color: rgba(var(--color-main) / var(--bg-alpha));
    color: rgba(var(--color-accent) / 100%);

    &:hover {
      --bg-alpha: 60%;
      color: rgba(var(--color-text) / 100%);
    }
    &:active {
      --bg-alpha: 100%;
      box-shadow: 0 0 0 var(--btn-ring) rgba(var(--color-main) / var(--btn-ring-alpha));
      color: rgba(var(--color-text) / 100%);
    }
  }

  &.link {
    --text-opacity: 90%;
    --bg-alpha: 0;
    background-color: rgba(var(--color-main) / var(--bg-alpha));
    color: rgba(var(--color-main) / 90%);

    &:hover {
      --text-opacity: 100%;
      text-decoration: underline;
    }

    &:active {
      --bg-alpha: 50%;
      color: rgba(var(--color-text) / 100%);
    }
  }

  &[disabled] {
    background-color: rgba(var(--color-main) / 10%);
    color: rgba(var(--color-text) / 25%);
    outline: none;
    pointer-events: none;
  }
}
</style>
