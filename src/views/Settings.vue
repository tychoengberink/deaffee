<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
    <ion-buttons slot="start">
		<ion-back-button defaultHref="/tabs/home"></ion-back-button>
	</ion-buttons>
         <ion-title>Settings </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label position="stacked">Stacked Label</ion-label>
        <ion-input></ion-input>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonInput, IonItem, IonLabel } from '@ionic/vue'

export default  {
  name: 'Settings',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonInput, IonItem, IonLabel },
  data() {
    return {
      
    }
  },
}
</script>