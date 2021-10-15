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
    path: "/login",
    component: () => import("@/views/Login.vue"),
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
        path: "",
        component: OrderTabs,
        redirect: "/tabs/orderdetails",
        children: [
          {
            name: "OrderDetails",
            path: "orderdetails",
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
  if (to.name !== "Login" && !TokenService.getToken()) next({ name: "Login" });
  else next();
});

export default router;
