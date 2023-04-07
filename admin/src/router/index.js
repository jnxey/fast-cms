import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Person from '@/views/person/index.vue'
import Space from '@/views/space/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: '/', redirect: 'home' },
    { path: '/home', name: 'home', meta: { layout: true }, component: Home },
    { path: '/login', name: 'login', meta: { layout: true }, component: Login },
    { path: '/person', name: 'person', meta: { layout: true }, component: Person },
    { path: '/space', name: 'space', meta: { layout: true }, component: Space }
  ]
})

export default router
