import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap-Stile
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

// Alle Komponenten importieren
import * as BootstrapVueNext from 'bootstrap-vue-next'

const app = createApp(App)

// 👇 Alle B*-Komponenten global registrieren
for (const [key, component] of Object.entries(BootstrapVueNext)) {
  if (key.startsWith('B')) {
    app.component(key, component)
  }
}

app.mount('#app')
