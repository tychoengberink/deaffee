<template>
  <ion-item @click="openModal">
    <ion-label class="left"> Order {{ order.id }} </ion-label>
    <ion-label class="right">
      {{ order.payed ? "Payed" : "Not payed" }}
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonLabel, modalController } from "@ionic/vue";
import orderDetailsModal from "@/components/modal/OrderDetailsModal.vue";
export default {
  props: ["order"],
  components: {
    IonItem,
    IonLabel,
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: orderDetailsModal,
        componentProps: {
          order: this.order,
        },
      });
      return modal.present();
    },
  },
};
</script>
