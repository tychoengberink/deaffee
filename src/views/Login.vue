<template>
  <ion-page>
    <ion-content padding>
      <form novalidate @submit.prevent="onLogin">
        <ion-grid>
          <ion-row>
            <ion-col align-self-center size-md="12" size-lg="12" size-xs="12">
              <ion-img :src="require('@/images/logo.png')"></ion-img>

              <ion-item text-center>
                <ion-label position="stacked" color="primary">Your pincode</ion-label>
                <ion-input
                  v-model="password"
                  name="password"
                  type="password"
                  required
                ></ion-input>
              </ion-item>
              <ion-text
                color="danger"
                v-show="!this.passwordValid && this.submitted == true"
                padding-left
              >
                Code is required
              </ion-text>

              <ion-text
                color="danger"
                v-show="!this.passwordWrong && this.submitted == true"
                padding-left
              >
                Code is wrong
              </ion-text>

              <ion-button type="submit" expand="block">Login</ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col align-self-center size-md="12" size-lg="12" size-xs="12">
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
  </ion-page>
</template>
<style lang="scss" scoped>
ion-row {
  ion-spinner {
    text-align: center;
  }
}
ion-img {
  width: 50%;
  margin-left: 25%;
  margin-top: 15%;
}
</style>
<script>
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
  IonInput,
  IonText,
  IonLabel,
  IonButton,
  IonImg,
  IonCol,
} from "@ionic/vue";
import { TokenService } from "@/services/token.service";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";

// import { UserService } from "@/services/user.service";

export default {
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonItem,
    IonInput,
    IonText,
    IonLabel,
    IonGrid,
    IonButton,
    IonImg,
    IonCol,
  },
  computed: {
    ...mapGetters("auth", ["isNotFirstTime"]),
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      username: null,
      password: null,
      submitted: false,
      img: null,
    };
  },

  ionViewWillEnter() {
    if (!this.isNotFirstTime) {
      this.router.push({ name: "Register" });
    } 
  },

  methods: {
    passwordValid() {
      if (this.password == null) {
        this.loading = false;
        return false;
      } else {
        return true;
      }
    },

    passwordWrong() {
      return true;
    },

    onLogin() {
      this.submitted = true;
      if (this.passwordValid()) {
        //TODO api login call
        //Testing
        // UserService.saveUser();
        TokenService.saveToken("bla");
        this.router.push("/tabs/home");
        this.submitted = false;
      }
    },
  },
};
</script>
