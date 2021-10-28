<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button @click="homeClick" href="/tabs/home" tab="home">
          <ion-icon :icon="homeOutline"/>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button
            :disabled="!this.activeTable"
            href="/tabs/order"
            tab="tabledetails"
        >
          <ion-icon :icon="clipboardOutline"/>
          <ion-label>Order</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,} from "@ionic/vue";
import {clipboardOutline, homeOutline} from "ionicons/icons";
import {mapGetters} from "vuex";

export default {
  name: "Tabs",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      clipboardOutline,
      homeOutline,
    };
  },

  computed: {
    ...mapGetters("order", ["activeTable"]),
  },

  methods: {
    homeClick() {
    },
  },
};
</script>
