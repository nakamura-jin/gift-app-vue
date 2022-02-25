import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Guard from '../services/middleware'
import Home from "../views/Home.vue";
import Login from '../views/Auth/Login.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: Guard.auth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
