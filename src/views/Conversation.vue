<template>
  <ion-page>
    <ion-grid fixed>
      <ion-row class="ion-align-items-start cover-large">
        <ion-col>
          <conversation-list :items="conversation" />
          <ion-fab vertical="bottom" horizontal="start">
            <ion-fab-button @click="addWaiterSentenceClick">
              <ion-icon :icon="chatboxOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>

          <ion-fab vertical="bottom" horizontal="end">
            <ion-fab-button @click="addCustomerSentenceClick">
              <ion-icon :icon="micOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="conversationOverviewClick"
            >Show conversation</ion-button
          >
        </ion-col>
        <ion-col>
          <ion-button expand="block" @click="finishTalkingClick"
            >Finish Talking</ion-button
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
  IonIcon,
  IonFab,
  IonFabButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  modalController,
} from "@ionic/vue";
import { micOutline, chatboxOutline } from "ionicons/icons";
import { mapGetters } from "vuex";
import ConversationList from "../components/ConversationList.vue";
import ConversationOverviewModal from "../components/modal/ConversationOverviewModal.vue";
import AddCustomerSentenceModal from "../components/modal/AddCustomerSentenceModal.vue";
import AddWaiterSentenceModal from "../components/modal/AddWaiterSentenceModal.vue";
import { useRouter } from "vue-router";

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
    ConversationList,
  },
  //TODO: Load conversation from API
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  data() {
    return {
      conversation: [],
      micOutline,
      chatboxOutline,
    };
  },
  methods: {
    ...mapGetters("order", ["activeTable"]),

    conversationOverviewClick() {
      this.openConversationModal();
    },

    finishTalkingClick() {
      this.router.push({name: "TableDetails"})
    },

    addCustomerSentenceClick() {
      this.openCustomerSentenceModal();
    },

    addWaiterSentenceClick() {
      this.openWaiterSentenceModal();
    },

    async openConversationModal() {
      const modal = await modalController.create({
        component: ConversationOverviewModal,
      });
      return modal.present();
    },

    async openWaiterSentenceModal() {
      const modal = await modalController.create({
        component: AddWaiterSentenceModal,
        cssClass: "dialog-modal",
      });
      return modal.present();
    },

    async openCustomerSentenceModal() {
      const modal = await modalController.create({
        component: AddCustomerSentenceModal,
        cssClass: "dialog-modal",
      });
      return modal.present();
    },
  },
};
</script>
