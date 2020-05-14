import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Allergens from "@/views/Allergens.vue";
import Login from "@/views/Login.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
    meta: {
      layout: "User",
      requiresAuth: true,
    },
  },
  {
    path: "/allergens",
    name: "allergens",
    component: Allergens,
    props: true,
    meta: {
      layout: "User",
      requiresAuth: true,
    },
  },
  {
    path: "/403",
    name: "unauthorized",
    component: Unauthorized,
    props: true,
    meta: {
      layout: "User",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "Empty",
    },
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
    props: true,
    meta: {
      layout: "Empty",
      requiresAuth: true,
    },
  },
];

export default function({ store }: any) {
  const Router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters["user/isLoggedIn"]) {
        next({
          name: "login",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
}
