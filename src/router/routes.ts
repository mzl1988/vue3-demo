import { RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/views/BasicLayout/index.vue';

// 主框架内显示的路由
export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component: BasicLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'TermsAndConditions',
        name: 'TermsAndConditions',
        component: () => import('@/views/TermsAndConditions/index.vue'),
        meta: {
          title: 'TermsAndConditions',
          // keepAlive: true,
        },
      },
    ],
  },
];

// 主框架外显示的路由
const frameOut = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
    },
  },
];

const errorPage = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
  },
];

export default [
  ...frameIn,
  ...frameOut,
  ...errorPage,
];
