<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <order-list :items="localOrders" />
    </ion-content>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="addOrderClick">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonIcon,
  IonFabButton,
  IonFab,
  modalController,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import OrderList from "../components/OrderList.vue";
import OrderDetailsModal from "../components/modal/OrderDetailsModal.vue";

export default {
  name: "TableDetails",
  props: ["order"],
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonFabButton,
    IonFab,
    OrderList,
  },

  data() {
    return { localOrders: this.order };
  },

  setup() {
    return {
      add,
    };
  },
  methods: {
    async getOrders(){
      //TODO Fetch orders
    },

    async addOrderClick() {
      var order;
      //TODO save order to API
      const modal = await modalController.create({
        componentProps: { order: order },
        component: OrderDetailsModal,
      });

      await modal.present();
    },
  },
};
</script>
