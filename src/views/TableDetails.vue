<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Order</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Order</ion-title>
        </ion-toolbar>
      </ion-header>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/vue";
import { useRoute } from 'vue-router';


export default {
  name: "Order",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },

   setup() {
    const route = useRoute();
    const { id } = route.params;
    return { id };
  }
};
</script>
