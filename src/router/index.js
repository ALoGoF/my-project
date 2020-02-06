import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/login/Login';
import Home from '@/views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
];

const router = new VueRouter({
  routes
});

export default router;
