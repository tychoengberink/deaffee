<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button data-cy="settingsButton" @click="settingsClick">
          <ion-icon color="primary" :icon="settingsOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title mode="ios">{{ title }}</ion-title>
      <ion-buttons data-cy="lockButton" slot="end">
        <ion-button @click="lockClick">
          <ion-icon color="primary" :icon="lockClosedOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { useRouter } from "vue-router";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from "@ionic/vue";
import { settingsOutline, lockClosedOutline } from "ionicons/icons";
import { mapActions } from "vuex";

export default {
  name: "MainHeader",
  props: ["title"],
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
  },
  setup() {
    const router = useRouter();
    return {
      router,
      settingsOutline,
      lockClosedOutline,
    };
  },
  methods: {
    ...mapActions("auth", ["signOut"]),

    async lockClick() {
      await this.signOut().then(() => {
        this.router.push({ name: "Login" });
      });
    },

    settingsClick() {
      this.router.push({ name: "Settings" });
    },
  },
};
</script>

<style></style>
