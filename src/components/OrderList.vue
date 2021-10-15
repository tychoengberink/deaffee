<template>
  <ion-content>
    <ion-list>
      <order-list-item v-for="order in items" :key="order.id" :order="order">
      </order-list-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonList, IonContent } from "@ionic/vue";
import OrderListItem from "./OrderListItem.vue";

export default {
  name: "ConversationList",
  components: {
    IonList,
    IonContent,
    OrderListItem,
  },
  props: {
    items: Array,
  },
};
</script>
