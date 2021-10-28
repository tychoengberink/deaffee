<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Delete product</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-title position="stacked"
          >Delete this product?
          </ion-title
          >
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="dismissModal"> No</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="deleteProductClick"> Yes</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {closeOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import {ApiService} from "../../services/api.service";

export default defineComponent({
  name: "addTableModal",
  props: ["order", "product"],
  data() {
    return {
      closeOutline,
      editOrder: this.order,
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
  },
  methods: {
    dismissModal() {
      modalController.dismiss();
    },

    deleteProductClick() {
      ApiService.delete(
          "api/order/" + this.order.id + "/product/" + this.product.id
      );

      this.editOrder.products.splice(this.product);
      this.dismissModal();
    },
  },
});
</script>
