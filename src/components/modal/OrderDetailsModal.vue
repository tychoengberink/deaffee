<template>
  <ion-page>
    <ion-backdrop></ion-backdrop>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismissModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title mode="ios">Order {{ order.id }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item v-for="product in order.products" :key="product.id">
                <ion-label class="left">
                  {{ product.name }}
                </ion-label>
                <ion-label class="right">
                  {{ product.amount }}
                </ion-label>
                <ion-button @click="editProduct(product)">
                  <ion-icon :icon="createOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
  IonButtons,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { closeOutline, createOutline } from "ionicons/icons";
import EditProductAmountModal from "./EditProductAmountModal.vue";

export default {
  name: "ConversationOverviewModal",
  props: ["order"],
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    IonButtons,
    IonIcon,
  },
  data() {
    return {
      closeOutline,
      createOutline,
    };
  },
  methods: {
    dismissModal() {
      this.modalController.dismiss();
    },
    async editProduct() {
      const modal = await modalController.create({
        component: EditProductAmountModal,
        cssClass: "dialog-modal",
      });
    //TODO: fix mulitple modals
      await modal.present();
    },
  },
};
</script>
