import { createRouter, createWebHistory } from "@ionic/vue-router";
import Tabs from "../views/Tabs.vue";
import OrderTabs from "../views/OrderTabs.vue";
import { TokenService } from "../services/token.service";

const routes = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    name: "Login",
    meta: { public: true },
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "Register",
    meta: { public: true },
    path: "/register",
    component: () => import("@/views/FirstTime.vue"),
  },
  {
    name: "Settings",
    path: "/settings",
    component: () => import("@/views/Settings.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        name: "Home",
        path: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        name: "Orders",
        path: "orders",
        component: () => import("@/views/Orders.vue"),
      },
      {
        path: "order/",
        component: OrderTabs,
        redirect: "/tabs/order/details",
        children: [
          {
            name: "OrderDetails",
            path: "details",
            component: () => import("@/views/OrderDetails.vue"),
          },
          {
            name: "Conversation",
            path: "conversation",
            component: () => import("@/views/Conversation.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(TokenService.getToken());
  if (!to.meta.public) {
    if (to.name !== "Login" && !TokenService.getToken()) {
      next("Login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
