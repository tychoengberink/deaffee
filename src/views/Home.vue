<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="settingsClick">
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title mode="ios">Welcome </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="lockClick">
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
      <ion-fab v-if="!this.activeTable" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addTableClick">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
  modalController,
} from "@ionic/vue";
import { settingsOutline, lockClosedOutline, add } from "ionicons/icons";
// import { OrderService } from "../services/order.service";
import { mapActions, mapGetters } from "vuex";
import { useRouter } from "vue-router";
import addTableModal from '@/components/AddTableModal.vue'

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
    IonFab,
    IonFabButton,
    IonList,
    IonItem,
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
      add,
    };
  },

  computed: {
   ...mapGetters("order",['activeTable'])
  },

  // created() {
  //   axios.get()
  //     .then(res => this.orders = res.data)
  // }

  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("order", ["setFinishedTalking"]),

    async lockClick() {
      // AuthService.signOut();
      await this.signOut().then(() => {
        this.router.push("/login");
      });
    },

    settingsClick() {
      this.router.push("/settings");
    },

    async addTableClick() {
      const modal = await modalController.create({
        component: addTableModal,
        cssClass: "dialog-modal",
      });
      
      await modal.present();
      await modal.onDidDismiss();

      if(this.activeTable){
      this.setFinished(false);
      this.router.push({ name: 'Conversation' });
      }
    },

    async refresh() {
 
   },
  },
};
</script>
