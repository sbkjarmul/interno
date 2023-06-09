import UserListView from '@/views/UserListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: '/', component: UserListView }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
