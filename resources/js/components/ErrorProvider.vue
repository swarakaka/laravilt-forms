<script setup lang="ts">
import { provide, computed } from 'vue'

const props = defineProps<{
    errors: Record<string, string | string[]>
}>()

// Provide errors to all child components
provide('errors', computed(() => props.errors || {}))
</script>

<template>
    <slot />
</template>
