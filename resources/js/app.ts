// Laravilt Forms Package Entry Point
import Form from './components/Form.vue'
import Select from './components/fields/Select.vue'

export { Form, Select }

export default {
    install(app, options = {}) {
        // Register global components with laravilt- prefix for LaraviltComponentRenderer
        app.component('laravilt-select', Select)
        app.component('Form', Form)
    }
}
