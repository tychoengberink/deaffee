<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <order-list :items="orders" />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import OrderList from "../components/OrderList.vue";

export default {
  name: "Order",
  components: {
    IonContent,
    IonPage,
    OrderList,
  },
  data() {
    return {
      orders: [
        {
          id: 1,
          products: [{ id: 0, name: "Coffee", amount: 2 }],
        },
      ],
    };
  },
};
</script>
