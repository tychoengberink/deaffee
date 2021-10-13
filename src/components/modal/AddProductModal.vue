<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Add product</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Product</ion-label>
            <ion-input v-model="product.name"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Amount</ion-label>
            <ion-input v-model="product.amount" type="number"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
       <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Price</ion-label>
            <ion-input v-model="product.price" type="number"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="addProductClick"
            >Add product</ion-button
          >
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
  IonInput,
  IonLabel,
  modalController,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "addTableModal",
  props: ["order"],
  data() {
    console.log(this.order);
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
    IonItem,
    IonInput,
    IonLabel,
  },
  methods: {

    dismissModal() {
      modalController.dismiss();
    },

    addProductClick() {
      //TODO save product order to api
      this.editOrder.products.push(this.product);
      this.dismissModal();
    },
  },
});
</script>
