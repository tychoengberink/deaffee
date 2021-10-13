<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title mode="ios">Settings </ion-title>
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
  IonBackButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonGrid,
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
