import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue';
import {TokenService} from '../services/token.service';

const routes = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'order',
        component: () => import('@/views/Order.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !TokenService.getToken()) next({ name: 'Login' })
  else next()
})

export default router
