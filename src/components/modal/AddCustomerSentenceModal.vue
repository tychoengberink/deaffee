<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Customer sentence</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Sentence</ion-label>
            <ion-textarea v-model="customerSentence"></ion-textarea>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button v-if="!listening" expand="block" @click="pushToTalk"
            >Click to talk</ion-button
          >
          <ion-button v-if="listening" expand="block" @click="pushToStop"
            >Click to stop</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonTextarea,
  IonLabel,
  modalController,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { SpeechRecognition } from "@ionic-native/speech-recognition";

export default defineComponent({
  name: "addTableModal",
  data() {
    return {
      closeOutline,
      customerSentence: "",
      listening: false,
      matches: [],
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonTextarea,
    IonLabel,
  },
  methods: {
    ...mapActions("order", ["saveActiveTable"]),

    dismissModal() {
      modalController.dismiss();
    },

    pushToTalk() {
      this.listening = true;

      //DEBUG
      SpeechRecognition.isRecognitionAvailable().then((available) =>
        console.debug(available)
      );

      // Check permission
      SpeechRecognition.hasPermission().then((hasPermission) =>
        console.log(hasPermission)
      );
      // Request permissions
      SpeechRecognition.requestPermission().then(
        () => console.log("Granted"),
        () => console.log("Denied")
      );

      SpeechRecognition.startListening({
        language: "en-US",
        showPopup: false,
        showPartial: true,
      }).subscribe(
        (matches) => {
          this.customerSentence = matches.toString();
          this.matches = matches;
        },
        (onerror) => console.log("error:", onerror)
      );
    },
    pushToStop() {
      this.customerSentence = this.matches[0];
      SpeechRecognition.stopListening();
      this.listening = false;
      this.dismissModal();

      //TODO add sentences to conversation
    },
  },
});
</script>
