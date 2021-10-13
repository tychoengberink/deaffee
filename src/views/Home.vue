<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="settingsClick">
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title mode="ios">Welcome {{ user.name }}!</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="lockClick">
            <ion-icon :icon="lockClosedOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-grid fixed>
      <ion-row>
        <ion-col>
          <ion-title color="primary">Tables</ion-title>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-start cover-large">
        <ion-col>
          <ion-content>
            <table-list :tables="tables" />
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="addTableClick">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<style lang="scss" scoped>
ion-grid {
  height: 100%;
  ion-row.cover-large {
    height: 95%;
    ion-col {
      height: 100%;
    }
  }
}
</style>

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
  modalController,
} from "@ionic/vue";
import { settingsOutline, lockClosedOutline, add } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";
import { useRouter } from "vue-router";
import addTableModal from "@/components/modal/AddTableModal.vue";
import TableList from "@/components/TableList.vue";
import { ApiService } from "../services/api.service";

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
    TableList,
  },
  data() {
    return {
      user: { name: "test" },
      tables: [
        // {
        //   id: 1,
        //   orders: [
        //     {
        //       id: 1,
        //       products: [{ id: 0, name: "Coffee", amount: 2, price: 2.0 }],
        //       total: 4,
        //       payed: false,
        //     },
        //     {
        //       id: 2,
        //       products: [{ id: 0, name: "Coffee", amount: 2, price: 2.3 }],
        //       total: 4.6,
        //       payed: true,
        //     },
        //   ],
        // },
        // {
        //   id: 2,
        //   orders: [
        //     {
        //       id: 1,
        //       products: [{ id: 0, name: "Coffee", amount: 2, price: 2.0 }],
        //       total: 4,
        //       payed: false,
        //     },
        //     {
        //       id: 2,
        //       products: [{ id: 0, name: "Coffee", amount: 2, price: 2.3 }],
        //       total: 4.6,
        //       payed: true,
        //     },
        //   ],
        // },
        // {
        //   id: 3,
        //   orders: [],
        // },
        // {
        //   id: 4,
        //   orders: [],
        // },
        // {
        //   id: 5,
        //   orders: [],
        // },
        // {
        //   id: 6,
        //   orders: [],
        // },
        // {
        //   id: 7,
        //   orders: [],
        // },
        // {
        //   id: 8,
        //   orders: [],
        // },
      ],
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
    ...mapGetters("order", ["activeTable"]),
  },

  created() {
   this.getTables();
  },

  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("order", ["setActiveTable"]),

    async lockClick() {
      await this.signOut().then(() => {
        this.router.push({ name: "Login" });
      });
    },

    settingsClick() {
      this.router.push({ name: "Settings" });
    },

    async addTableClick() {
      const modal = await modalController.create({
        component: addTableModal,
        cssClass: "dialog-modal",
      });

      await modal.present();
      await modal.onDidDismiss();

      if (this.activeTable) {
        this.saveActiveTable(this.activeTable);
        this.router.push({ name: "Conversation" });
      }
    },

    async getTables() {
      console.log(await ApiService.get("table" ));
      //TODO fetch tables from api
    },
  },
};
</script>
