<script setup lang="ts">
import type { Issue } from '@/api-client'

const props = defineProps<Issue>()
</script>
<template>
  {{ props.issueId }}
</template>
<style lang="scss"></style>
