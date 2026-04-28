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
      isNavbar: false,
      requireAuth: true
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/views/Statistics.vue'),
    meta: {
      key: 'statistics',
      isTabbar: true,
      isNavbar: true,
      requireAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      key: 'profile',
      isTabbar: true,
      isNavbar: false,
      requireAuth: true
    }
  },
  {
    path: '/attendance-confirmation',
    name: 'attendance-confirmation',
    component: () => import('@/views/AttendanceConfirmation.vue'),
    meta: {
      key: 'attendance-confirmation',
      isNavbar: true,
      requireAuth: true
    }
  },
  {
    path: '/attendance-details',
    name: 'attendance-details',
    component: () => import('@/views/AttendanceDetails.vue'),
    meta: {
      key: 'attendance-details',
      isNavbar: true,
      requireAuth: true
    }
  },
  {
    path: '/allowance-details',
    name: 'allowance-details',
    component: () => import('@/views/AllowanceDetails.vue'),
    meta: {
      key: 'allowance-details',
      isNavbar: true,
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要登录
  console.log(from)
  if (to.meta.requireAuth) {
    // 从sessionStorage获取token
    const token = sessionStorage.getItem('a_token')
    if (token) {
      // 从sessionStorage获取用户信息
      const userInfoStr = sessionStorage.getItem('a_userinfo')
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null

      // 检查applyPersonType
      if (userInfo && userInfo.applyPersonType === null) {
        // applyPersonType为null，仅允许访问首页和考勤详情页
        if (to.path === '/home' || to.path === '/attendance-details') {
          next()
        } else {
          // 禁止访问其他页面，重定向到首页
          next('/')
          console.log('您仅有权限访问考勤功能')
        }
      } else {
        // applyPersonType不为null，正常访问
        next()
      }
    } else {
      // 无token，重定向到首页
      next('/')
      // 可以添加提示信息
      console.log('请先登录')
    }
  } else {
    // 不需要登录的路由，直接放行
    next()
  }
})
export default router