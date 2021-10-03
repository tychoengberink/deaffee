<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer name="Home page" />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {mapActions} from "vuex";
import {TokenService} from "@/services/token.service";
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useRouter } from 'vue-router';

export default  {
  name: 'Home',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      
    }
  },
  setup() {
    const router = useRouter();
    return {
      router,

    };
  },
  methods: {
  ...mapActions("home", ["loadSecretArea"]),
    async loadHomeData() {
        await this.loadSecretArea().then((res) => {
          this.msg = res.data;
        });
    },
    ionViewWillEnter() {
    if(!TokenService.getToken()){
      this.router.push('/login');
    }
    }
  }
}
</script>