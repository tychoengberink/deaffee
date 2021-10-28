<template>
  <ion-content>
    <ion-list>
      <order-list-item :key="order.id" :order="order" v-for="order in items">
      </order-list-item>
    </ion-list>
  </ion-content>
</template>

<script>
import {IonContent, IonList} from "@ionic/vue";
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
