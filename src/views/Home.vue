<template>
  <ion-page>
    <main-header :title="'Welcome ' + userName + '!'" />
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
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  modalController,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";
import { useRouter } from "vue-router";
import addTableModal from "@/components/modal/AddTableModal.vue";
import TableList from "@/components/TableList.vue";
import { ApiService } from "../services/api.service";
import MainHeader from "../components/MainHeader.vue";

export default {
  name: "Home",
  components: {
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    TableList,
    MainHeader,
  },
  computed: {
    ...mapGetters("auth", ["userName"]),
  },
  data() {
    return {
      tables: null,
    };
  },

  setup() {
    const router = useRouter();
    return {
      router,
      add,
    };
  },

  mounted() {
    ApiService.get("api/table").then((response) => (this.tables = response.data));
  },

  methods: {
    ...mapGetters("order", ["activeTable"]),
    ...mapActions("order", ["saveActiveTable"]),

    async addTableClick() {
      const modal = await modalController.create({
        component: addTableModal,
        cssClass: "dialog-modal",
      });

      await modal.present();
      await modal.onDidDismiss();

      if (this.activeTable) {
        this.saveActiveTable(this.activeTable);
        this.router.push({ name: "Orders" });
      }
    },
  },
};
</script>
