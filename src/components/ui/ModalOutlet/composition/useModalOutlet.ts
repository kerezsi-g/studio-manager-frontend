import { type Ref, type ComputedRef, computed, ref, shallowRef } from 'vue'
import type { ModalDef } from '../types'

export const DefaultModalOutlet = Symbol('v-modal-root')

interface ModalContainer {
  queue: Ref<ModalDef[]>
  isPending: Ref<boolean>
  currentDialog: ComputedRef<ModalDef>
  push: (modal: ModalDef) => void
  dispose: (modal: ModalDef) => void
}

export function useModalOutlet(containerId: symbol) {
  if (__containers[containerId]) {
    // console.warn(`Using duplicate outlets for modal container id = ${containerId.description}`)
    return __containers[containerId]
  } else {
    const container = __registerContainer(containerId)
    return container
  }
}

/** @internal */
const __containers: Record<symbol, ModalContainer> = {}

/**
 * @internal
 */
function __registerContainer(id: symbol) {
  const queue = shallowRef<ModalDef[]>([])
  const isPending = ref<boolean>(false)

  function push(modal: ModalDef) {
    queue.value = [...queue.value, modal]
  }

  function dispose(modal: ModalDef) {
    queue.value = queue.value.filter((mdl) => mdl.id !== modal.id)
  }

  function __filterFn(def: ModalDef) {
    return def.containerId === id
  }

  const currentDialog = computed(() => {
    const dialog = queue.value.filter(__filterFn)[0] ?? null
    // console.log(dialog)
    return dialog
  })

  const container = {
    queue,
    isPending,
    currentDialog,
    push,
    dispose
  }

  __containers[id] = container

  return container
}
