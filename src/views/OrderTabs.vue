<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="top">
        <ion-tab-button href="/tabs/order/details" tab="details">
          <ion-label>Order details</ion-label>
        </ion-tab-button>
        <ion-tab-button href="/tabs/order/conversation" tab="conversation">
          <ion-label>Conversation</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<style lang="scss" scoped>
ion-tab-button {
  ion-label {
    font-size: 18px;
  }
}
</style>

<script>
import {IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,} from "@ionic/vue";
import {clipboardOutline, homeOutline} from "ionicons/icons";
import {mapGetters} from "vuex";

export default {
  name: "TableTabs",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
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
    ...mapGetters("order", ["finishedTalking"]),
  },
};
</script>
