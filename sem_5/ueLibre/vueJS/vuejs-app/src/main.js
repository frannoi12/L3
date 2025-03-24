import Appe from './appe.vue'
import './assets/main.css'
import Exo from './components/Exo.vue'
import { createApp } from 'vue'
import Message from './components/Message.vue'
import Syntaxe from './components/Syntaxe.vue'
import router from './components/router'
import App from './App.vue'
//createApp(Exo).mount('#exo')
createApp(App).use(router).mount('#app')

//createApp(Appe).mount('#app')
