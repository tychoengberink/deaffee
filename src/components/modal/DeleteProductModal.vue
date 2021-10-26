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
            <ion-title position="stacked">Are you sure you want to delete this product?</ion-title>
          </ion-item>
        </ion-col>
      </ion-row>
       <ion-row>
        <ion-col>
          <ion-item>
           <ion-buttons>
            <ion-button>
              No
              <ion-button>
              <ion-button>
              Yes
              <ion-button>
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

export default defineComponent({
  name: "addTableModal",
  props: ["order"],
  data() {
    return {
      closeOutline,
      editOrder: this.order,
      product: { name: null, amount: 0 },
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
    IonItem
  },
  methods: {

    dismissModal() {
      modalController.dismiss();
    },

    deleteProductClick() {
      //TODO DELETE product from order API
      this.editOrder.products.remove(this.product);
      this.dismissModal();
    },
  },
});
</script>
