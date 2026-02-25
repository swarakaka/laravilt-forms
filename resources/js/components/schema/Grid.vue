<template>
    <div v-if="visibleSchema.length > 0" :class="gridClasses">
        <div
            v-for="(child, index) in visibleSchema"
            :key="child.name || child.id || index"
            :class="getColumnSpanClass(child)"
        >
            <component
                :is="getComponent(child)"
                v-bind="getComponentProps(child)"
                :value="modelValue?.[child.name]"
                :model-value="modelValue?.[child.name]"
                :disabled="props.disabled || child.disabled"
                @update:model-value="(value) => updateValue(child.name, value)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

// Import commonly used components directly for faster modal load
import TextInput from '../fields/TextInput.vue'
import Textarea from '../fields/Textarea.vue'
import Toggle from '../fields/Toggle.vue'
import Checkbox from '../fields/Checkbox.vue'
import CheckboxList from '../fields/CheckboxList.vue'
import Select from '../fields/Select.vue'

const props = defineProps<{
    columns: number | Record<string, number>
    schema: Array<any>
    modelValue?: Record<string, any>
    disabled?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [value: Record<string, any>]
}>()

// Filter out hidden fields from schema
const visibleSchema = computed(() => {
    return props.schema.filter(child => child && child.hidden !== true)
})

const updateValue = (name: string, value: any) => {
    const newValue = {
        ...(props.modelValue || {}),
        [name]: value
    }
    emit('update:modelValue', newValue)
}

// Get component props, excluding value, modelValue, and disabled since we set them explicitly
const getComponentProps = (component: any) => {
    const { value, modelValue, disabled, ...rest } = component
    return rest
}

const toLaraviltName = (name: any) => {
  if (!name) return
  return 'laravilt-' + name.replaceAll('_', '-')
}

const getComponent = (component: any) => {
  return toLaraviltName(component.component) || 'div'
}

const gridClasses = computed(() => {
    const classes = ['grid', 'gap-6']

    if (typeof props.columns === 'number') {
        classes.push(`grid-cols-1`)
        if (props.columns > 1) {
            classes.push(`md:grid-cols-${props.columns}`)
        }
    } else if (typeof props.columns === 'object') {
        if (props.columns.default) classes.push(`grid-cols-${props.columns.default}`)
        if (props.columns.sm) classes.push(`sm:grid-cols-${props.columns.sm}`)
        if (props.columns.md) classes.push(`md:grid-cols-${props.columns.md}`)
        if (props.columns.lg) classes.push(`lg:grid-cols-${props.columns.lg}`)
        if (props.columns.xl) classes.push(`xl:grid-cols-${props.columns.xl}`)
    }

    return classes.join(' ')
})

const getColumnSpanClass = (child: any): string => {
    if (!child.columnSpan) return ''

    // Handle 'full' string value from columnSpanFull()
    if (child.columnSpan === 'full') {
        return 'col-span-full'
    }

    if (typeof child.columnSpan === 'number') {
        return `col-span-${child.columnSpan}`
    }

    if (typeof child.columnSpan === 'object') {
        const classes: string[] = []
        if (child.columnSpan.default) classes.push(`col-span-${child.columnSpan.default}`)
        if (child.columnSpan.sm) classes.push(`sm:col-span-${child.columnSpan.sm}`)
        if (child.columnSpan.md) classes.push(`md:col-span-${child.columnSpan.md}`)
        if (child.columnSpan.lg) classes.push(`lg:col-span-${child.columnSpan.lg}`)
        return classes.join(' ')
    }

    return ''
}
</script>
