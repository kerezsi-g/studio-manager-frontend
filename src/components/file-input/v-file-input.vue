<script setup lang="ts">
import { computed, ref } from 'vue'
import SolarIcon from '../SolarIcon.vue'
import { generateSha256Hash } from '@/utils/gen-hash'

const props = withDefaults(
  defineProps<{
    label: string
    // multiple?: boolean
    /**
     * Max file size in MB
     */
    maxSize?: number
    accept?: string
  }>(),
  {
    label: 'Choose a File',
  },
)

const emit = defineEmits<{
  (c: 'file-changed'): void
}>()

const fileRef = ref<File>()
const modelValue = defineModel<File>()

function handleFileChange(e: Event) {
  modelValue.value = undefined

  emit('file-changed')

  const target = e.target as HTMLInputElement

  const [file] = Array.from(target.files ?? [])

  fileRef.value = file

  if (props.maxSize && file.size > props.maxSize * 1024 * 1024) {
    return
  }

  modelValue.value = file

  emit('file-changed')
}

const fileSize = computed(() => {
  if (!fileRef.value) {
    return ''
  } else {
    return `${(fileRef.value.size / 1024 / 1024).toFixed(2)}`
  }
})

const palette = computed(() => {
  if (modelValue.value) {
    return 'success'
  } else if (fileRef.value) {
    return 'error'
  } else {
    return 'info'
  }
})
</script>
<template>
  <div class="v-file-input-wrapper" :class="[`palette-${palette}`]">
    <input type="file" @change="handleFileChange" class="v-file-input" v-bind="{ accept }" />
    <SolarIcon
      v-if="modelValue"
      icon="file-check"
      class="file-icon icon-lg"
      variant="bold-duotone"
    />
    <SolarIcon
      v-else-if="fileRef"
      icon="file-remove"
      class="file-icon icon-lg"
      variant="bold-duotone"
    />
    <SolarIcon v-else icon="folder-with-files" class="file-icon icon-lg" variant="bold-duotone" />

    <div v-if="fileRef" class="file-info">
      <span class="file-name">{{ fileRef.name }}</span>
      <span class="file-size"
        >{{ fileSize }} MB <template v-if="!modelValue">(max. {{ maxSize }})</template></span
      >
    </div>

    <div v-else class="file-info">
      <span class="file-name">{{ label }}</span>
      <span class="file-size" v-if="maxSize">max. {{ maxSize }} MB</span>
    </div>
  </div>
</template>
<style lang="scss">
.file-icon {
  color: rgba(var(--color-main) / 100%);
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-name {
  font-weight: 400;
}

.file-size {
  font-weight: 300;
  // font-style: italic;
  opacity: 0.8;
  font-size: 0.825rem;
  // color: rgba(var(--color-main) / 100%);
}

.v-file-input-wrapper {
  --bg-opacity: 15%;
  --border-opacity: 50%;

  position: relative;

  background-color: rgba(var(--color-main) / var(--bg-opacity));
  border: 1px dotted rgba(var(--color-main) / var(--border-opacity));

  border-radius: 2px;
  padding: 1.5rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.v-file-input-wrapper:hover {
  --bg-opacity: 30%;
  --border-opacity: 100%;
}

.v-file-input {
  position: absolute;
  inset: 0;
  opacity: 0;

  cursor: pointer;
}
</style>
