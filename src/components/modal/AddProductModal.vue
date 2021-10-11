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
        </ion-col>
      </ion-row>
       <ion-row>
        <ion-col>
          <ion-button expand="block" @click="addTableClick">Add table</ion-button>
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
  modalController,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "addTableModal",
  data() {
    return {
      closeOutline,
      tableNumber: "",
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
  },
  methods: {
    ...mapActions("order", ["saveActiveTable"]),

    dismissModal() {
      modalController.dismiss();
    },

    addTableClick(){
      this.saveActiveTable(this.tableNumber);
      this.dismissModal();
    }
  },
});
</script>