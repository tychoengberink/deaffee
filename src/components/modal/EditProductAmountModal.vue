<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Edit product</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Amount</ion-label>
            <ion-input
                :disabled="true"
                type="number"
                v-model="this.editedProduct.amount"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="6">
          <ion-button @click="addProductClick" expand="block"
          >
            <ion-icon :icon="add"></ion-icon
            >
          </ion-button>
        </ion-col>
        <ion-col size="6">
          <ion-button @click="minProductClick" expand="block"
          >
            <ion-icon :icon="removeOutline"></ion-icon
            >
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="editProductClick" expand="block"
          >Save amount
          </ion-button>
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
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {add, closeOutline, removeOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
import {ApiService} from "../../services/api.service";

export default defineComponent({
  name: "editProductAmountModal",
  props: ["product"],
  data() {
    return {
      editedProduct: this.product,
      closeOutline,
      add,
      removeOutline,
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
    ...mapGetters("order", ["activeOrder"]),

    dismissModal() {
      modalController.dismiss();
    },

    addProductClick() {
      this.editedProduct.amount++;
    },

    minProductClick() {
      if (this.editedProduct.amount != 1) {
        --this.editedProduct.amount;
      }
    },

    editProductClick() {
      ApiService.put(
        "/api/order/" + this.activeOrder() + "/product/" + this.product.id,
        { amount: this.editedProduct.amount }
      );
      this.dismissModal();
    },
  },
});
</script>
