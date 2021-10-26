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
          <ion-item>
            <ion-title position="stacked"
              >Are you sure you want to delete this product?</ion-title
            >
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-buttons>
              <ion-button @click="dismissModal"> No </ion-button>
              <ion-button @click="deleteProductClick"> Yes </ion-button>
            </ion-buttons>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
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
  IonItem,
  modalController,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { ApiService } from "../../services/api.service";

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
    IonItem,
  },
  methods: {
    dismissModal() {
      modalController.dismiss();
    },

    deleteProductClick() {
        ApiService.delete(
          "api/order/" + this.order.id + "/product/" + this.product.id
        ).then((response) => {
          console.log(response);
        });

      this.editOrder.products.splice(this.product);
      this.dismissModal();
    },
  },
});
</script>
