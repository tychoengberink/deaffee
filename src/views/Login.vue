<template>
  <ion-page>
    <ion-content class="ion-padding">
     <form novalidate @submit.prevent="onLogin">
        <ion-list>
          <!-- <ion-item>
            <ion-label position="stacked" color="primary">Username</ion-label>
            <ion-input
              v-model="username"
              name="username"
              type="text"
              spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item> -->

          <!-- <ion-text color="danger">
            <p v-show="!this.usernameValid ||this. submitted == true" padding-left>Username is required</p>
          </ion-text> -->

          <ion-item>
            <ion-label position="stacked" color="primary">Password</ion-label>
            <ion-input v-model="password" name="password" type="password" required></ion-input>
          </ion-item>

          <ion-text color="danger">
            <p v-show="!this.passwordValid || this.submitted == true" padding-left>Password is required</p>
          </ion-text>
        </ion-list>

        <ion-row responsive-sm>
          <ion-col>
            <ion-button type="submit" expand="block">Login</ion-button>
          </ion-col>
        </ion-row>
      </form>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}
.login-logo img {
  max-width: 150px;
}
.list {
  margin-bottom: 0;
}
</style>

<script>


import { IonPage, IonContent, IonRow, IonCol, IonItem, IonInput, IonText, IonLabel, IonList, IonButton} from '@ionic/vue';

export default  {
  name: 'Home',
  components: { IonContent, IonPage, IonRow, IonCol, IonItem, IonInput, IonText, IonLabel, IonList, IonButton },
  data(){
      return {
         username: "",
         password: "",
        submitted: false,
      }
  },
  methods: {
  usernameValid() {
    return true;
  },
  passwordValid() {
    return true;
  },
  onLogin() {
    console.log(this.password);
  },
  }
}
</script>