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

      <ExploreContainer name="Order page" />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  modalController
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import AddTableModal from "@/components/AddTableModal.vue";

export default {
  name: "Order",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  mounted(){
    this.openModal();
  },
  setup() {
    const openModal = async () => {
      const modal = await modalController.create({
        component: AddTableModal, //Modal is name of the component to render inside ionic modal
      });
      return modal.present();
    };

    return { openModal };
  },
};
</script>
