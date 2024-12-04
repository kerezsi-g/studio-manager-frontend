import type { Component } from 'vue'

export type NotArray<T> = T extends Array<unknown> ? never : T

export interface ModalDef {
  component: Component
  props: any
  onResolve: any
  onReject: any
  id: number
  containerId: Symbol
  e?: Event
}

export interface ModalTransitionProps {
  /**
   * The dialog object
   */
  currentDialog?: ModalDef
  /**
   * Transition hook to open the dialog container.
   */
  onBeforeEnter: () => void
  /**
   * Transition hook to close the dialog container.
   */
  onAfterLeave: () => void
}
