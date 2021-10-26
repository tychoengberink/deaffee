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
            <ion-text
              color="danger"
              v-show="this.errors.errorName && this.submitted"
              padding-left
            >
              Name can not be empty
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Amount</ion-label>
            <ion-input v-model="product.amount" type="number"></ion-input>
            <ion-text
              color="danger"
              v-show="this.errors.errorAmount && this.submitted"
              padding-left
            >
              Amount can not be empty
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Price</ion-label>
            <ion-input v-model="product.price" type="number"></ion-input>
            <ion-text
              color="danger"
              v-show="this.errors.errorPrice && this.submitted"
              padding-left
            >
              Price can not be empty
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="addProductClick"
            >Add product</ion-button
          >
          <ion-text
            color="danger"
            v-show="this.uniqueError && this.submitted"
            padding-left
          >
            Product need to be unique
          </ion-text>
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
import { ApiService } from "../../services/api.service";

export default defineComponent({
  name: "addTableModal",
  props: ["order"],
  data() {
    return {
      closeOutline,
      submitted: false,
      editOrder: this.order,
      errors: {
        errorName: false,
        errorPrice: false,
        errorAmount: false,
      },
      uniqueError: false,
      product: { name: null, amount: null, price: null },
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
      this.submitted = true;
      if (this.product.name === null || 0) {
        this.errors.errorName = true;
      } else {
        this.errors.errorName = false;
      }

      if (this.product.amount === null || 0) {
        this.errors.errorAmount = true;
      } else {
        this.errors.errorAmount = false;
      }

      if (this.product.price === null || 0) {
        this.errors.errorPrice = true;
      } else {
        this.errors.errorPrice = false;
      }

      var errors = false;
      for (const key in this.errors) {
        if (this.errors[key]) {
          errors = true;
        }
      }

      if (!errors) {
        this.uniqueError = false;
        ApiService.post("api/product", {
          name: this.product.name,
          price: parseInt(this.product.price),
        })
          .then((response) => {
            ApiService.post("api/order/" + this.order.id + "/product", {
              product_id: response.data.id,
              amount: this.product.amount,
            }).then(() => {
              this.submitted = false;
              this.editOrder.products.push(this.product);
              this.dismissModal();
            });
          })
          .catch((error) => {
            if (error.response.status === 500) {
              this.uniqueError = true;
            }
          });
      }
    },
  },
});
</script>
