<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="settingsButtonClick">
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
         <ion-title>Welcome </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="lockButtonClick">
             <ion-icon :icon="lockClosedOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
       
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-title>Orders</ion-title>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { settingsOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { useRouter } from 'vue-router';

export default  {
  name: 'Home',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonButton, IonIcon  },
  data() {
    return {
      user: null,
    }
  },
  setup() {
     const router = useRouter();
    return{
       router,
      settingsOutline,  
      lockClosedOutline,
    }
  },
  methods: {
    lockButtonClick() {
      AuthService.signOut();
      this.router.push('/login');
    },

    settingsButtonClick() {
      this.router.push('/settings');
    }
  }
}
</script>