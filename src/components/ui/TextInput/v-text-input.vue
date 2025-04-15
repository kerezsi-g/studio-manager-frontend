<script lang="ts">
//TODO: move to its own file
import type { PaletteKey } from '../Button'

export interface TextInputProps {
  type?: string
  placeholder?: string
  autocomplete?: string //TODO: create enum type
  name?: string
  pattern?: string | RegExp
  required?: boolean
  color?: PaletteKey
  readonly?: boolean
  //   validate?: VALIDATE
  defaultValue?: string
  value?: string
}

export enum VALIDATE {
  ALWAYS = 'always',
  ONCHANGE = 'onchange',
  NEVER = 'never',
}

export const enum VALIDATION_STATE {
  UNVALIDATED,
  VALIDATING,
  VALIDATED,
}
</script>
<script setup lang="ts">
withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
})

const emit = defineEmits<{
  (c: 'change', v: any): void
}>()

const modelValue = defineModel('modelValue', {
  default: '',
})
</script>
<template>
  <div class="v-input-wrapper palette-info">
    <slot name="prefix" />
    <input
      @change="(e) => $emit('change', e)"
      class="v-input"
      v-model="modelValue"
      v-bind="{
        placeholder,
        autocomplete,
        name,
        type,
        readonly,
        pattern: pattern instanceof RegExp ? pattern.toString() : pattern,
        required,
      }"
    />
  </div>
</template>
<style lang="css">
@reference 'tailwindcss';

.v-input-wrapper {
  @apply transition-all;
  --ring-width: 0px;
  --ring-alpha: 0%;
  --border-alpha: 60%;
  --bg-alpha: 50%;

  position: relative;

  display: flex;
  align-items: center;

  gap: 8px;
  padding-inline: 12px;
  padding-block: 8px;

  position: relative;
  box-sizing: border-box;

  border: 1px solid rgba(var(--color-main) / var(--border-alpha));
  border-radius: 2px;

  background: rgba(0 0 0 / var(--bg-alpha));

  box-shadow: 0px 0px var(--ring-width) 0px rgba(var(--color-main) / var(--ring-alpha));

  overflow: hidden;
}

.v-input-wrapper:focus-within {
  --ring-width: 4px;
  --ring-alpha: 100%;
  --border-alpha: 100%;
  background-color: rgba(var(--color-main) / 10%);
}

.v-input-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: rgba(0 0 0 / var(--bg-alpha));
  z-index: -1;
}

.v-input-wrapper:hover {
  --border-alpha: 80%;
  --bg-alpha: 60%;
}

.v-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;

  /* padding: 0.5rem 1rem; */

  outline: none;

  &::placeholder {
    color: inherit;
    opacity: 0.25;
  }
}
</style>
