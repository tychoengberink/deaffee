<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="top">
        <ion-tab-button tab="conversation" href="/tabs/conversation">
          <ion-label>Conversation</ion-label>
        </ion-tab-button>
          
        <ion-tab-button :disabled="!this.finishedTalking" tab="details" href="/details">
          <ion-label>Table details</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { clipboardOutline, homeOutline } from 'ionicons/icons';
import { mapGetters } from 'vuex';

export default {
  name: 'TableTabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet },
  setup() {
    return {
      clipboardOutline,  
      homeOutline,
    }
  },

  computed: {
   ...mapGetters("order",['finishedTalking'])
  },

}
</script>