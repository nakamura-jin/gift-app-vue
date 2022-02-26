import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Guard from '../services/middleware'
import Home from "../views/Home.vue";
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import RegistrationComplete from '../views/Auth/RegistrationComplete.vue';
import OwnerHome from '../views/Owner/OwnerHome.vue';
import OwnerMenu from '../views/Owner/OwnerMenu.vue';
import OwnerMenuCreate from '../views/Owner/OwnerMenuCreate.vue';
import OwnerProductsStock from '../views/Owner/OwnerProductsStock.vue';
import Detail from '../views/Detail.vue';
import Purchased from '../views/Purchased.vue';
import AdminHome from '../views/Admin/AdminHome.vue';
import AdminNews from '../views/Admin/AdminNews.vue';
import AdminSendEmail from '../views/Admin/AdminSendEmail.vue';
import AllUserLists from '../views/Admin/AllUserLists.vue'



Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: Guard.auth
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/registration_complete',
    name: 'RegistrationComplete',
    component: RegistrationComplete,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/owner/:id',
    name: 'OwnerHome',
    component: OwnerHome,
    props: true,
    beforeEnter: Guard.auth
  },
  {
    path: '/owner/:id/menu',
    name: 'OwnerMenu',
    component: OwnerMenu,
  },
  {
    path: '/owner/menu/create',
    name: 'OwnerMenuCreate',
    component: OwnerMenuCreate,
  },
  {
    path: '/owner/:id/products_stock',
    name: 'OwnerProductsStock',
    component: OwnerProductsStock,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    beforeEnter: Guard.auth
  },
  {
    path: '/purchased',
    name: 'Purchased',
    component: Purchased,
    beforeEnter: Guard.auth
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
  },
  {
    path: '/create/news',
    name: 'AdminNews',
    component: AdminNews,
    beforeEnter: Guard.auth
  },
  {
    path: '/contact',
    name: 'AdminSendEmail',
    component: AdminSendEmail,
    beforeEnter: Guard.auth
  },
  {
    path: '/admin/all_lists',
    name: 'AllUserLists',
    component: AllUserLists,
    beforeEnter: Guard.auth
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
