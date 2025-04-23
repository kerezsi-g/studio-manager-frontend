<script setup lang="ts">
import { API } from '@/api'

interface Props {
  sha256: string
}

const props = defineProps<Props>()

async function getFileInfo({ sha256 }: Props) {
  const results = API.Files.getFileInfo({ sha256 })
}
</script>
<template></template>
<style lang="scss"></style>
