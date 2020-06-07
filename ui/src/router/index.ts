import Vue from "vue";
import VueRouter from "vue-router";

import UserHome from "@/views/User/Home.vue";
import UserAllergens from "@/views/User/Allergens.vue";
import UserProfile from "@/views/User/Profile.vue";

import PartnerHome from "@/views/Partner/Home.vue";
import PartnerRestaurant from "@/views/Partner/Restaurant.vue";
import PartnerMenu from "@/views/Partner/Menu.vue";
import PartnerDisplayRestaurant from "@/views/Partner/DisplayRestaurant.vue";
import PartnerCreateRestaurant from "@/views/Partner/CreateRestaurant.vue";

import PartnerLogin from "@/views/Partner/Login.vue";
import UserLogin from "@/views/User/Login.vue";


import Root from "@/views/Root.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const userMeta = {
  layout: "User",
  requiresAuth: true,
  requiresType: "user",
};

const partnerMeta = {
  layout: "Partner",
  requiresAuth: true,
  requiresType: "partner",
};

const routes = [
  {
    path: "/",
    component: Root,
    props: true,
    meta: userMeta,
    children: [
      {
        path: "/",
        name: "home",
        component: UserHome,
        props: true,
        meta: userMeta,
      },
      {
        path: "allergens",
        name: "allergens",
        component: UserAllergens,
        props: true,
        meta: userMeta,
      },
      {
        path: "profile",
        name: "profile",
        component: UserProfile,
        props: true,
        meta: userMeta,
      },
    ],
  },
  {
    path: "/partner",
    component: Root,
    props: true,
    meta: partnerMeta,
    children: [
      {
        path: "/",
        name: "partner",
        component: PartnerHome,
        props: true,
        meta: partnerMeta,
      },
      {
        path: "restaurant",
        name: "restaurants",
        component: PartnerRestaurant,
        props: true,
        meta: partnerMeta,
        children: [
          {
            path: "create",
            name: "createRestaurant",
            component: PartnerCreateRestaurant,
            props: true,
            meta: partnerMeta,
          },
        ],
      },
      {
        path: "restaurant/:id",
        name: "restaurant",
        component: PartnerDisplayRestaurant,
        props: true,
        meta: partnerMeta,
      },
      {
        path: "menu",
        name: "menu",
        component: PartnerMenu,
        props: true,
        meta: partnerMeta,
      },
    ],
  },
  {
    path: "/login",
    component: Root,
    meta: {
      layout: "Empty",
    },
    children: [
      {
        path: "/",
        name: "userlogin",
        component: UserLogin,
        meta: {
          layout: "Empty",
        },
      },
      {
        path: "partner",
        name: "partnerlogin",
        component: PartnerLogin,
        meta: {
          layout: "Empty",
        },
      },
    ],
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
        if (
          to.matched[0].meta.requiresType &&
          to.matched[0].meta.requiresType === "user"
        ) {
          next({
            name: "userlogin",
            query: { redirect: to.fullPath },
          });
        } else {
          next({
            name: "partnerlogin",
            query: { redirect: to.fullPath },
          });
        }
      } else if (
        to.matched[0].meta.requiresType &&
        to.matched[0].meta.requiresType !== store.getters["user/userType"]
      ) {
        next({ name: "unauthorized" });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
}
