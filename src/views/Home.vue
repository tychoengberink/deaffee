<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="settingsButtonClick">
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Welcome </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="lockButtonClick">
            <ion-icon :icon="lockClosedOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-start">
              <ion-title color="primary">Orders</ion-title>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item v-for="order in orders" :key="order.id">
                {{ order.id }}
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
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { settingsOutline, lockClosedOutline } from "ionicons/icons";
import { AuthService } from "../services/auth.service";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      user: null,
      orders: [],
    };
  },
  setup() {
    const router = useRouter();
    return {
      router,
      settingsOutline,
      lockClosedOutline,
    };
  },
  // created() {
  //   axios.get()
  //     .then(res => this.orders = res.data)
  // }
  methods: {
    lockButtonClick() {
      AuthService.signOut();
      this.router.push("/login");
    },

    settingsButtonClick() {
      this.router.push("/settings");
    },
  },
};
</script>
