import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/inmu',
      name: 'inmu',
      component: () => import('../views/InmuPlayer.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/videoView.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('../views/ControlVideo.vue')
    },
    {
      path: '/videocontrol',
      name: 'VideoControl',
      component: () => import('../views/VideoControl.vue')
    }
  ]
})

export default router
