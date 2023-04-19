import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Person from '@/views/person/index.vue'
import Space from '@/views/space/index.vue'
import ResetPwd from '@/views/reset-pwd/index.vue'
import Manager from '@/views/manager/index.vue'
import Dynamic from '@/views/dynamic/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', name: '', redirect: '/home' },
    { path: '/', name: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', meta: { layout: true }, component: Home },
    { path: '/person', name: 'person', meta: { layout: true }, component: Person },
    { path: '/space', name: 'space', meta: { layout: true }, component: Space },
    { path: '/reset-pwd', name: 'reset-pwd', meta: { layout: true }, component: ResetPwd },
    { path: '/manager', name: 'manager', meta: { layout: true }, component: Manager },
    { path: '/dynamic', name: 'dynamic', meta: { layout: true }, component: Dynamic }
  ]
})

export default router
