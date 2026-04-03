import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Entries from './views/Entries.vue'
import NewEntry from './views/NewEntry.vue'
import EditEntry from './views/EditEntry.vue'
import Quiz from './views/Quiz.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/entries', name: 'entries', component: Entries },
  { path: '/entries/new', name: 'new-entry', component: NewEntry },
  { path: '/entries/:id/edit', name: 'edit-entry', component: EditEntry, props: true },
  { path: '/quiz', name: 'quiz', component: Quiz }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router