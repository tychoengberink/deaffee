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
                padding-left
                v-show="this.errors.errorName && this.submitted"
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
            <ion-input type="number" v-model="product.amount"></ion-input>
            <ion-text
                color="danger"
                padding-left
                v-show="this.errors.errorAmount && this.submitted"
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
            <ion-input type="number" v-model="product.price"></ion-input>
            <ion-text
                color="danger"
                padding-left
                v-show="this.errors.errorPrice && this.submitted"
            >
              Price can not be empty
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="addProductClick" expand="block"
          >Add product
          </ion-button
          >
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
  IonText,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {closeOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import {ApiService} from "../../services/api.service";

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
      product: {name: null, amount: null, price: null},
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
    IonText,
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
        ApiService.post("api/product", {
          name: this.product.name,
          price: parseInt(this.product.price),
        })
            .then((response) => {
              this.addProductToOrder(response.data);
            })
            .catch((error) => {
              if (error.response.status === 500) {
                ApiService.get("api/product").then((response) => {
                  response.data.forEach((product) => {
                    if (product.name === this.product.name) {
                      this.editProductInOrder(product)
                    }
                  });
                });
              }
            });
      }
    },

    addProductToOrder(product) {
      ApiService.post("api/order/" + this.order.id + "/product", {
        product_id: product.id,
        amount: this.product.amount,
      }).then(() => {
        this.submitted = false;
        product.amount = this.product.amount;
        this.editOrder.products.push(product);
        this.dismissModal();
      });
    },

    editProductInOrder(product) {
      ApiService.post("api/order/" + this.order.id + "/product", {
        product_id: product.id,
        amount: this.product.amount,
      }).then(() => {
        this.submitted = false;
        product.amount = this.product.amount;

        this.editOrder.products.forEach((loopProduct) => {
          if(loopProduct.id == product.id) {
            loopProduct.amount = parseInt(loopProduct.amount) + parseInt(product.amount);
          }
        }
        )

        this.dismissModal();
      });
    }
  },
});
</script>
