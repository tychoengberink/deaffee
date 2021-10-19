<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  beforeCreate() {
    //fetch old states if available
    this.$store.commit("auth/initialiseStore");
    this.$store.commit("order/initialiseStore");
  },
});
</script>
