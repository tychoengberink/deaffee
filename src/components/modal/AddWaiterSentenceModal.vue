<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Waiter sentence</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Sentence</ion-label>
            <ion-textarea v-model="waiterSentence"></ion-textarea>
            <ion-text
                color="danger"
                padding-left
                v-show="this.error && this.submitted"
            >
              Please type a sentence!
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="addWaiterSentence" expand="block"
          >Add sentence
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
import {ApiService} from "../../services/api.service";

export default defineComponent({
  name: "addTableModal",
  props: ["conversation"],
  data() {
    return {
      closeOutline,
      waiterSentence: "",
      error: false,
      submitted: false,
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
    IonLabel,
    IonText,
  },
  methods: {
    ...mapActions("order", ["saveActiveTable"]),

    dismissModal() {
      modalController.dismiss();
    },

    addWaiterSentence() {
      this.submitted = true;
      var sentence = {
        isClient: 0,
        text: this.waiterSentence,
        conversation_id: this.conversation.id,
      };

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
