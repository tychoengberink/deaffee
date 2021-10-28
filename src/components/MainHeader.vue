<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="settingsClick" data-cy="settingsButton">
          <ion-icon :icon="settingsOutline" color="primary"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title mode="ios">{{ title }}</ion-title>
      <ion-buttons data-cy="lockButton" slot="end">
        <ion-button @click="lockClick">
          <ion-icon :icon="lockClosedOutline" color="primary"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {useRouter} from "vue-router";
import {IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar,} from "@ionic/vue";
import {lockClosedOutline, settingsOutline} from "ionicons/icons";
import {mapActions} from "vuex";

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
        this.router.push({name: "Login"});
      });
    },

    settingsClick() {
      this.router.push({name: "Settings"});
    },
  },
};
</script>

<style></style>
