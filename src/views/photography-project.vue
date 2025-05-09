<script setup lang="ts">
import type { ProjectAsset, ProjectDetails } from '@/api-client'
import { useModal } from '@/components/modal'
import { ref } from 'vue'

const props = defineProps<ProjectDetails>()

const selectedAsset = ref<ProjectAsset | null>(null)

const primaryAssets = computed(() => {
  return props.assets.filter((asset) => asset.tag === 'pending-review')
})

const emit = defineEmits<{
  (c: 'changed'): void
}>()
function handleSelectAsset(asset: ProjectAsset) {
  selectedAsset.value = asset
}
</script>
<template></template>
<style lang="scss"></style>
