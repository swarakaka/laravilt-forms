<script setup lang="ts">
import { provide, computed, watch } from 'vue'

const props = defineProps<{
    errors: Record<string, string | string[]>
}>()

// Provide errors to all child components
const errorsComputed = computed(() => props.errors || {})
provide('errors', errorsComputed)
</script>

<template>
    <slot />
</template>
