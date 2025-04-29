<script setup lang="ts">
import { onClickOutside, useParentElement } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

const parentElement = useParentElement()

const contextMenuRef = ref<HTMLMenuElement | null>(null)

onMounted(() => {
  if (!parentElement.value) return

  parentElement.value.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    open()
  })

  parentElement.value.style.setProperty('anchor-name', '--context-menu')

})

onUnmounted(() => {
  parentElement.value?.removeEventListener('contextmenu', (e) => {
    e.preventDefault()
    open()
  })
})

onClickOutside(contextMenuRef, close)
</script>
<template>
  <menu v-if="isOpen" class="v-context-menu" ref="contextMenuRef">
    <slot />
  </menu>
</template>
<style lang="css">
.v-context-menu {
  background-color: rgba(var(--surface-dark) / 100%);
  position: fixed;
  z-index: 10;
  position-anchor: --context-menu;
  position-area: center center;
}
</style>
