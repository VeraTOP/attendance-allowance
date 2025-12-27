import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      key: 'home',
      isTabbar: true,
      isNavbar: false
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/views/Statistics.vue'),
    meta: {
      key: 'statistics',
      isTabbar: true,
      isNavbar: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      key: 'profile',
      isTabbar: true,
      isNavbar: false
    }
  },
  {
    path: '/attendance-confirmation',
    name: 'attendance-confirmation',
    component: () => import('@/views/AttendanceConfirmation.vue'),
    meta: {
      key: 'attendance-confirmation',
      isNavbar: true
    }
  },
  {
    path: '/attendance-details',
    name: 'attendance-details',
    component: () => import('@/views/AttendanceDetails.vue'),
    meta: {
      key: 'attendance-details',
      isNavbar: true
    }
  },
  {
    path: '/allowance-details',
    name: 'allowance-details',
    component: () => import('@/views/AllowanceDetails.vue'),
    meta: {
      key: 'allowance-details',
      isNavbar: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router