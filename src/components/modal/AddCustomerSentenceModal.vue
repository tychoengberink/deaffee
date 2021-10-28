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
            <ion-textarea
                :disabled="true"
                v-model="speechToTextOutput"
            ></ion-textarea>
            <ion-text
                color="danger"
                padding-left
                v-show="this.error && this.submitted"
            >
              Please click the button to generate a sentence!
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="pushToTalk" expand="block" v-if="!listening"
          >Click to talk
          </ion-button
          >
          <ion-button @click="pushToStop" expand="block" v-if="listening"
          >Click to stop
          </ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {closeOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import {mapActions} from "vuex";
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import {ApiService} from "../../services/api.service";

export default defineComponent({
  name: "addTableModal",
  props: ["conversation"],
  data() {
    return {
      closeOutline,
      speechToTextOutput: "",
      listening: false,
      error: false,
      submitted: false,
      matches: [],
      editConversation: this.conversation,
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
    IonText,
    IonLabel,
  },
  methods: {
    ...mapActions("order", ["saveActiveTable"]),

    dismissModal() {
      modalController.dismiss();
    },

    pushToTalk() {
      this.listening = true;

      // Check permission
      SpeechRecognition.hasPermission().then((hasPermision) => {
        if (!hasPermision) {
          // Request permissions
          SpeechRecognition.requestPermission();
        }
      });

      SpeechRecognition.startListening({
        language: "en-US",
        showPopup: false,
        showPartial: true,
      }).subscribe(
          (matches) => {
            //Set match to v-model
            this.speechToTextOutput = matches.toString();
            this.matches = matches;
          }
      );
    },
    pushToStop() {
      this.submitted = true;
      var sentence = {
        text: this.matches[0],
        isClient: 1,
        conversation_id: this.conversation.id,
      };

      SpeechRecognition.stopListening();
      this.listening = false;

      ApiService.post("api/sentence", sentence)
          .then((response) => {
            sentence.push({id: response.data.id});
            this.editConversation.sentences.push(sentence);
            this.dismissModal();
            this.submitted = false;
            this.error = false;
          })
          .catch(() => {
            this.error = true;
          });
    },
  },
});
</script>
