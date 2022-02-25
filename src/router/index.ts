import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Guard from '../services/middleware'
import Home from "../views/Home.vue";
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import RegistrationComplete from '../views/Auth/RegistrationComplete.vue';




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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
