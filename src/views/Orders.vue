<template>
  <ion-page>
    <main-header :title="'Table: ' + this.activeTable" />
    <ion-grid fixed>
      <ion-row>
        <ion-col>
          <ion-title color="primary">Orders</ion-title>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-start cover-large">
        <ion-col>
          <ion-content>
            <order-list :items="orders" />
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="addOrderClick">
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
  IonContent,
  IonIcon,
  IonFabButton,
  IonFab,
  IonTitle,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import OrderList from "../components/OrderList.vue";
// import OrderDetailsModal from "../components/modal/OrderDetailsModal.vue";
import { ApiService } from "../services/api.service";
import { mapActions, mapGetters } from "vuex";
import MainHeader from "../components/MainHeader.vue";
import { useRouter } from 'vue-router';

export default {
  name: "TableDetails",
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonFabButton,
    IonFab,
    IonTitle,
    IonCol,
    IonRow,
    IonGrid,
    OrderList,
    MainHeader,
  },

  computed: {
    ...mapGetters("order", ["activeTable"]),
  },

  data() {
    return {
      table: this.activeTable,
      orders: null,
    };
  },

  mounted() {
    ApiService.get("order").then((response) => (this.orders = response.data));
  },

  setup() {
    const router = useRouter();
    return {
      add,
      router,
    };
  },

  methods: {
    ...mapActions("order", ["saveActiveOrder"]),
    async addOrderClick() {
      var order;
      ApiService.post("order", { table_id: this.activeTable }).then(
        (response) => {
          order = response.data;
          this.saveActiveOrder(order.id);
          this.router.push({
            name: "OrderDetails",
          });
        }
      );
    },
  },
};
</script>
