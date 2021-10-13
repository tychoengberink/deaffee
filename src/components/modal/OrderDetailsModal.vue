<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismissModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title mode="ios"
          >Order {{ order.id }} ({{ totalPrice }})
        </ion-title>
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
                <ion-label class="left">
                  {{ product.price }}
                </ion-label>
                <ion-label class="right">
                  {{ product.amount }}
                </ion-label>
                <ion-button  v-if="!this.order.payed" @click="editProduct(product)">
                  <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                </ion-button>
                <ion-button  v-if="!this.order.payed" @click="removeProduct(product)">
                  <ion-icon slot="icon-only" :icon="trashBinOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button v-if="!this.order.payed" expand="block" @click="addProduct"
              >Add product</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button  v-if="!this.order.payed" expand="block" @click="checkOutClick"
              >Check out</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.right {
  padding-right: 5px;
}
</style>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonItem,
  IonList,
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
  IonButtons,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { closeOutline, createOutline, trashBinOutline } from "ionicons/icons";
import EditProductAmountModal from "./EditProductAmountModal.vue";
import AddProductModal from "./AddProductModal.vue";

export default {
  name: "ConversationOverviewModal",
  props: ["order"],
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonPage,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    IonButtons,
    IonIcon,
  },
  computed: {
    totalPrice: function() {
      var total = 0;
      this.order.products.forEach((product) => {
        total += product.price * product.amount;
      });

      return total;
    },
  },
  data() {
    return {
      closeOutline,
      createOutline,
      trashBinOutline,
    };
  },
  methods: {
    dismissModal() {
      modalController.dismiss();
    },

    async editProduct(product) {
      const modal = await modalController.create({
        componentProps: { product: product },
        component: EditProductAmountModal,
        cssClass: "dialog-modal",
      });
      await modal.present();
    },
    async addProduct() {
      const modal = await modalController.create({
        componentProps: { order: this.order },
        component: AddProductModal,
        cssClass: "dialog-modal",
      });
      await modal.present();
    },

    checkOutClick() {},
  },
};
</script>
