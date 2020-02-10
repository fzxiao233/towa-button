import Vue from 'vue'
import Router from 'vue-router'

const HomePage = () => import('./components/home.vue');
const Admin = () => import('./components/admin');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', name: "home", component: HomePage},
    {path: '/admin', name: "admin", component: Admin},
  ]
})
