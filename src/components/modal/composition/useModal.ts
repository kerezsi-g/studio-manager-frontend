/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue'

import type { ModalDef } from '../types'
import type { ComponentProps } from 'vue-component-type-helpers'
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

type SingleOrTuple<T extends any[]> = T extends [infer A] ? A : T

type OnResolveArgs<T extends Component> =
  ComponentProps<T> extends { onResolve: infer F }
    ? F extends (...args: any[]) => any
      ? Parameters<F>
      : never
    : never

export type ComponentWithResolve<T extends Component> =
  ComponentProps<T> extends { onResolve: infer R } ? T : never

type PropsWithoutResolver<T extends Component> = Omit<ComponentProps<T>, 'onResolve'>

export async function useModal<T extends Component>(
  component: ComponentWithResolve<T>,
  props: PropsWithoutResolver<T>,
  opts: UseModalOptions = {},
): Promise<SingleOrTuple<OnResolveArgs<T>>> {
  const { containerId = DefaultModalOutlet, e } = opts

  const __container = useModalOutlet(containerId)

  const { promise, resolve, reject } = createResolver()

  const __dialog: ModalDef = {
    component,
    containerId,
    props,
    onResolve: resolve,
    onReject: reject,
    e,
    id: __counter++,
  }

  __container.push(__dialog)

  promise.finally(() => {
    __container.dispose(__dialog)
  })

  return promise.then((result: any[]) => {
    if (result?.length === 1) {
      return result[0]
    } else {
      return result
    }
  })
}

export async function useModalAsync<T extends Component>(
  component: ComponentWithResolve<T>,
  getProps: () => Promise<PropsWithoutResolver<T>>,
  opts: UseModalOptions = {},
): Promise<SingleOrTuple<OnResolveArgs<T>>> {
  const { containerId = DefaultModalOutlet } = opts

  const __container = useModalOutlet(containerId)

  __container.isPending.value = true

  const props = await getProps()

  __container.isPending.value = false

  return await useModal(component, props, opts)
}

/** @internal Used to generate unique integer keys */
let __counter = 0
