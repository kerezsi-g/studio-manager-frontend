<script lang="ts">
export interface GlideProps extends ModalTransitionProps {
  /**
   * Specifies the starting position of the animation along the path from the click source to the center of the screen.
   * Higher values indicate a starting point closer to the click.
   *
   * Expected to be in the [0, 1] range.
   */
  translateOffset?: number

  /**
   * Specifies the initial scaling factor for the dialog. The dialog will scale up to 100% from this initial value.
   *
   * Expected to be in the [0, 1] range.
   */
  initialScale?: number

  /**
   * Duration of the enter animation in milliseconds.
   */
  enter?: number

  /**
   * Duration of the leave animation in milliseconds.
   */
  leave?: number
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import type { ModalTransitionProps } from '../types'

const props = withDefaults(defineProps<GlideProps>(), {
  initialScale: 0.6,
  translateOffset: 0.4,
  enter: 375,
  leave: 175
})

function calculateOffsetVector(e: Event) {
  if (e instanceof PointerEvent) {
    const { clientX, clientY } = e

    const [centerX, centerY] = [window.innerWidth / 2, window.innerHeight / 2]

    const vX = clientX - centerX
    const vY = clientY - centerY

    return [vX, vY]
  } else {
    return [0, 0]
  }
}

const style = computed(() => {
  const { initialScale, translateOffset, enter, leave, currentDialog } = props

  const [x, y] = currentDialog?.e ? calculateOffsetVector(currentDialog.e) : [0, 0]

  return {
    '--translate-x': `${x}px`,
    '--translate-y': `${y}px`,
    '--translate-coeff': translateOffset,
    '--scale': currentDialog?.e ? initialScale : 0.9,
    '--enter-duration': `${enter}ms`,
    '--leave-duration': `${leave}ms`
  }
})
</script>
<template>
  <Transition name="v-dialog-glide" appear v-bind="{ onBeforeEnter, onAfterLeave }" mode="out-in">
    <!-- Wrap component to handle fragments -->
    <div :style="style" v-if="currentDialog" :key="currentDialog.id">
      <component
        v-bind="currentDialog.props"
        @resolve="currentDialog.onResolve"
        @reject="currentDialog.onReject"
        :is="currentDialog.component"
      />
    </div>
  </Transition>
</template>
<style lang="scss">
.v-dialog-glide {
  &-enter-from,
  &-leave-to {
    position: absolute;
    opacity: 0;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
    transition-duration: var(--leave-duration);
    transition-property: opacity, transform;
  }

  &-enter-from {
    transform: translate(
        calc(var(--translate-coeff) * var(--translate-x)),
        calc(var(--translate-coeff) * var(--translate-y))
      )
      scale(var(--scale));
  }

  &-leave-to {
    transform: translate(0, -0.5rem) scale(1);
  }

  &-enter-to,
  &-leave-from {
    opacity: 100;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: var(--enter-duration);
    transition-property: opacity, transform;
    transform: translate(0 0) scale(1);
  }
}
</style>
