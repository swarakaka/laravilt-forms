<script setup>
import { computed, getCurrentInstance } from 'vue';

const props = defineProps({
    component: {
        type: String,
        required: true
    },
    props: {
        type: Object,
        default: () => ({})
    },
    componentKey: {
        type: String,
        default: ''
    }
});

// Get the current instance to access the app context
const instance = getCurrentInstance();

// Convert PascalCase or snake_case to kebab-case
// Examples: "TextInput" -> "text-input", "date_range_picker" -> "date-range-picker"
const toKebabCase = (str) => {
    return str
        .replace(/_/g, '-')  // Convert underscores to hyphens
        .replace(/([a-z])([A-Z])/g, '$1-$2')  // Convert PascalCase
        .toLowerCase();
};

// Resolve the component by name from the global components registry
const resolvedComponent = computed(() => {
    const kebabName = toKebabCase(props.component);
    const componentName = `laravilt-${kebabName}`;

    // Try to get the component from the app context
    const component = instance?.appContext.components[componentName];

    if (component) {
        return component;
    }

    console.error(`Failed to resolve component: ${componentName}`);
    return 'div'; // Fallback to div
});

const componentProps = computed(() => props.props);
</script>

<template>
    <component
        :is="resolvedComponent"
        v-bind="componentProps"
        :key="componentKey"
    />
</template>
