<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Add table</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Table number</ion-label>
            <ion-input v-model="tableNumber" type="number"></ion-input>
          </ion-item>
          <ion-text
            color="danger"
            v-show="!this.checkTableExists && this.submitted"
            padding-left
          >
            Table number exists!
          </ion-text>

          <ion-text
            color="danger"
            v-show="this.tableNumberValid && this.submitted"
            padding-left
          >
            Please fill in a table number
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="addTableClick"
            >Add table</ion-button
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
  IonInput,
  IonLabel,
  IonText,
  modalController,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { ApiService } from "../../services/api.service";

export default defineComponent({
  name: "addTableModal",
  data() {
    return {
      closeOutline,
      tableNumber: "",
      submitted: false,
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
    IonInput,
    IonLabel,
    IonText,
  },
  methods: {
    ...mapActions("order", ["saveActiveTable"]),

    dismissModal() {
      modalController.dismiss();
    },

    tableNumberValid() {
      if (this.tableNumber != "") {
        return true;
      }
      return false;
    },

    async checkTableExists() {
      if (this.tableNumberValid()) {
        await ApiService.get("api/table/" + this.tableNumber)
          .then((response) => {
            console.log(response.code);
          })
          .catch((error) => console.log(error));
      }
    },

    async addTableClick() {
      this.submitted = true;
      if (await !this.checkTableExists()) {
        await this.saveActiveTable(this.tableNumber);
        this.dismissModal();
        this.submitted = false;
        return;
      }
    },
  },
});
</script>
