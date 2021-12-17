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
        name: 'dashboard_page',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'termsAndConditions',
        name: 'terms_and_conditions_page',
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
    name: 'login_page',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: 'Login',
    },
  },
];

const errorPage = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found_page',
    component: () => import('@/views/error/404.vue'),
  },
];

export default [
  ...frameIn,
  ...frameOut,
  ...errorPage,
];
