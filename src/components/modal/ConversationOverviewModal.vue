<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismissModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title mode="ios">Conversation </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <!-- <conversation-list /> -->
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
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
  IonButtons,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

// import ConversationList from "../components/ConversationList.vue";

export default {
  name: "ConversationOverviewModal",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    IonButtons,
    IonIcon,
    // ConversationList,
  },
  data() {
    return {
      closeOutline,
    };
  },

  methods: {
    dismissModal() {
      modalController.dismiss();
    },
  },
};
</script>
