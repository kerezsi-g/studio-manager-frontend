import type { DefineComponent, ExtractPublicPropTypes } from 'vue'

import type { ModalDef, NotArray } from '../types'
import { DefaultModalOutlet, useModalOutlet } from '../composition/useModalOutlet'
import { createResolver } from '@/utils/resolver'

/**
 * @author KG <kerezsigergely@infobex.hu>
 *
 * Creates a modal dialog using the given Vue component and props.
 * Returns a promise that is resolved when the modal dialog is closed.
 * The returned value is the passed component's `resolve` emit
 *
 * The passed component must implement, and use a `resolve` emit, or the dialog will stay in the queue indefinitely.
 *
 * @param component The Vue component to be used as the modal dialog.
 * @param props The props to be passed to the modal dialog component.
 * @param e The event that caused the dialog to be opened.
 *
 * @example
 * // Using the useModal function in a Vue component
 * const result = await useModal(MyDialogComponent, { prop1: 'value1', prop2: 'value2' });
 * console.log('Modal closed with result:', result);
 */

interface UseModalOptions {
  e?: Event
  containerId?: symbol
}

export async function useModal<
  Resolve extends (res: NotArray<any>) => void,
  Reject extends (err: NotArray<any>) => void,
  Props,
  Emits extends { resolve: Resolve; reject?: Reject }
>(
  component: DefineComponent<Props, any, any, any, any, any, any, Emits>,
  props: ExtractPublicPropTypes<Props> | (() => Promise<ExtractPublicPropTypes<Props>>),
  opts: UseModalOptions = {}
) {
  //   let __dialog: ModalDef
  let __props: ExtractPublicPropTypes<Props>

  const { containerId = DefaultModalOutlet, e } = opts

  const __container = useModalOutlet(containerId)

  if (typeof props === 'function') {
    __container.isPending.value = true

    __props = await props()

    __container.isPending.value = false
  } else {
    __props = props
  }

  const { promise, resolve, reject } = createResolver()

  const __dialog: ModalDef = {
    component,
    containerId,
    props: __props,
    onResolve: resolve,
    onReject: reject,
    e,
    id: __counter++
  }

  __container.push(__dialog)

  promise.finally(() => {
    __container.dispose(__dialog)
  })

  return promise.then((result) => {
    return result as Parameters<Emits['resolve']>[0]
  })
}

/** @internal Used to generate unique integer keys */
let __counter = 0
