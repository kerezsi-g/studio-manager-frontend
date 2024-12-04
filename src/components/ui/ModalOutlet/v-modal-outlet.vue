<script setup lang="ts">
/**
 * @author KG <kerezsigergely@infobex.hu>
 *
 * Vue 3 component that handles the rendering of the global dialog queue.
 *
 * @remarks
 * Renders dialogs from the global dialog queue.
 * Pushing into the the queue is possible with the `useModal` composable. This component focuses solely on the rendering aspect.
 * Dialogs must handle their own closing logic.
 *
 * @see {@link module:unstable/ModalOutlet/composition/useModal}
 */
import { nextTick, ref, watchEffect } from 'vue'
import { useModalOutlet, DefaultModalOutlet } from './composition/useModalOutlet'

export interface ModalOutletProps {
  /**
   * `name` prop to pass on to the rendered Transition component (default: "v-dialog")
   */
  transitionName?: string
  /**
   * Unique identifier of the modal outlet
   */
  containerId?: symbol
}

const props = withDefaults(defineProps<ModalOutletProps>(), {
  transitionName: 'v-dialog',
  containerId: DefaultModalOutlet
})

const containerRef = ref<HTMLDialogElement>()
const containerVisible = ref(false)

const documentBody = document.body

const { currentDialog, isPending } = useModalOutlet(props.containerId)

async function openContainer() {
  if (containerRef.value?.open) return

  containerVisible.value = true

  await nextTick() // Flush changes to DOM before trying to open the modal

  containerRef.value?.showModal()
}

function onBeforeEnter() {
  if (containerVisible.value) return
  openContainer()
}

function onAfterLeave() {
  closeContainer()
}

async function closeContainer() {
  await nextTick()

  if (currentDialog.value) return

  containerRef.value?.close()
  containerVisible.value = false
}
watchEffect(() => {
  if ((currentDialog.value || isPending.value) && containerVisible.value === false) {
    openContainer()
  }
})
</script>
<template>
  <Teleport :to="documentBody">
    <dialog ref="containerRef" :id="containerId.description" v-if="containerVisible">
      <!-- <slot
        name="debug"
        v-bind="{ openContainer, closeContainer, containerVisible, currentDialog }"
      /> -->

      <slot v-bind="{ onBeforeEnter, onAfterLeave, currentDialog }">
        <Transition
          ref="transitionRef"
          :name="transitionName"
          appear
          v-bind="{ onAfterLeave, onBeforeEnter, onBeforeAppear: onBeforeEnter }"
        >
          <!-- Wrap component to handle fragments -->
          <div class="v-modal-inner" v-if="currentDialog" :key="currentDialog.id">
            <component
              :is="currentDialog.component"
              v-bind="currentDialog.props"
              @resolve="currentDialog.onResolve"
              @reject="currentDialog.onReject"
            />
          </div>
        </Transition>
      </slot>
    </dialog>
  </Teleport>
</template>
<style lang="scss">
#v-modal-root {
  @apply flex flex-col items-center justify-center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  background: rgba(0 0 0 / 75%);
  @apply text-white;
}

.v-dialog {
  &-enter-from,
  &-leave-to {
    position: absolute;
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: 375ms;
    transform: translate(0, -1rem) scale(0.9);
  }

  &-enter-to,
  &-leave-from {
    position: absolute;
    opacity: 1;
    transition-property: opacity, transform;
    transition-duration: 375ms;
    transform: translate(0, 0) scale(1);
  }
}
</style>
