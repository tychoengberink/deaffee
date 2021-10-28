<template>
  <ion-page v-if="loading"></ion-page>
  <ion-page v-else>
    <ion-grid fixed>
      <ion-row class="ion-align-items-start cover-large">
        <ion-col>
          <conversation-list
              :items="conversation.sentences"
              v-if="conversation.sentences"
          />
          <ion-title color="primary" v-else
          >No conversation available
          </ion-title
          >
          <ion-fab
              horizontal="start"
              v-if="!this.order.isPaid"
              vertical="bottom"
          >
            <ion-fab-button @click="addWaiterSentenceClick">
              <ion-icon :icon="chatboxOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>

          <ion-fab horizontal="end" v-if="!this.order.isPaid" vertical="bottom">
            <ion-fab-button @click="addCustomerSentenceClick">
              <ion-icon :icon="micOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button
              :disabled="this.order.isPaid"
              @click="finishTalkingClick"
              expand="block"
          >Finish Talking
          </ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<style lang="scss" scoped>
ion-grid {
  height: 100%;

  ion-row.cover-large {
    height: 90%;

    ion-col {
      height: 100%;
    }
  }
}
</style>

<script>
import {
  IonButton,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  modalController,
} from "@ionic/vue";
import {chatboxOutline, micOutline} from "ionicons/icons";
import {mapGetters} from "vuex";
import ConversationList from "../components/ConversationList.vue";
import AddCustomerSentenceModal from "../components/modal/AddCustomerSentenceModal.vue";
import AddWaiterSentenceModal from "../components/modal/AddWaiterSentenceModal.vue";
import {useRouter} from "vue-router";
import {ApiService} from "../services/api.service";

export default {
  name: "Conversation",
  components: {
    IonIcon,
    IonFab,
    IonFabButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonPage,
    IonTitle,
    ConversationList,
  },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  data() {
    return {
      micOutline,
      chatboxOutline,
      conversation: null,
      order: null,
      loading: true,
    };
  },

  computed: {
    ...mapGetters("order", ["activeOrder"]),
  },

  ionViewWillEnter() {
    this.getConversation();
  },

  methods: {
    conversationOverviewClick() {
      this.openConversationModal();
    },

    finishTalkingClick() {
      this.router.push({name: "OrderDetails"});
    },

    addCustomerSentenceClick() {
      this.openCustomerSentenceModal();
    },

    addWaiterSentenceClick() {
      this.openWaiterSentenceModal();
    },

    async openWaiterSentenceModal() {
      const modal = await modalController.create({
        component: AddWaiterSentenceModal,
        componentProps: {conversation: this.conversation},
        cssClass: "dialog-modal",
      });
      await modal.present();
    },

    async openCustomerSentenceModal() {
      const modal = await modalController.create({
        component: AddCustomerSentenceModal,
        componentProps: {conversation: this.conversation},
        cssClass: "dialog-modal",
      });
      await modal.present();
    },

    async getConversation() {
      ApiService.get("api/order/" + this.activeOrder).then((response) => {
        this.order = response.data;
        ApiService.get("api/conversation/" + response.data.conversation.id).then(
            (response) => {
              this.conversation = response.data;
              this.loading = false;
            }
        );
      });
    },
  },
};
</script>
