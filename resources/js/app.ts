// Laravilt Forms Package Entry Point
import FormRenderer from './components/FormRenderer.vue'
import Select from './components/fields/Select.vue'

export { FormRenderer, Select }

export default {
    install(app, options = {}) {
        // Register global components with laravilt- prefix for LaraviltComponentRenderer
        app.component('laravilt-select', Select)
        app.component('FormRenderer', FormRenderer)
    }
}
