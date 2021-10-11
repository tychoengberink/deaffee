<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button :disabled="!this.activeTable" tab="conversation" href="/tabs/conversation">
          <ion-icon :icon="clipboardOutline" />
          <ion-label>Order</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { clipboardOutline, homeOutline } from 'ionicons/icons';
import { mapGetters } from 'vuex';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      clipboardOutline,  
      homeOutline,
    }
  },

  computed: {
   ...mapGetters("order",['activeTable'])
  },

}
</script>