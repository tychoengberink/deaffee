<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title mode="ios">Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-start">
              <h4>Change PIN</h4>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked">PIN</ion-label>
              <ion-input></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked">Retype PIN</ion-label>
              <ion-input></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"></ion-col>
          <ion-col size="4">
            <ion-button :disabled="true" @click="savePin">
              Not yet supported
            </ion-button>
          </ion-col>
          <ion-col size="3"></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

export default {
  name: "Settings",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    IonGrid,
  },
  data() {
    return {};
  },

  methods: {
    savePin() {
      //TODO: Save pin to API
    },
  },
};
</script>
