<template>
  <ion-page>
    <ion-content padding>
      <form novalidate @submit.prevent="onLogin">
        <ion-grid>
          <ion-row>
            <ion-col align-self-center size-md="12" size-lg="12" size-xs="12">
              <ion-img :src="require('@/images/logo.png')"></ion-img>

              <ion-item text-center>
                <ion-label position="stacked" color="primary"
                  >Your pincode</ion-label
                >
                <ion-input
                  v-model="password"
                  name="password"
                  type="password"
                  data-cy="password"
                  required
                ></ion-input>
              </ion-item>
              <ion-text
                color="danger"
                v-show="this.errors.passwordNumber && this.submitted"
                padding-left
              >
                Pincode needs to be a number!
              </ion-text>

              <ion-text
                color="danger"
                v-show="this.errors.passwordEmpty && this.submitted"
                padding-left
              >
                Pincode cant be empty!
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
import { useRouter } from "vue-router";
import { mapActions, mapGetters } from "vuex";

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
      password: null,
      errors: {
        passwordEmpty: false,
        passwordNumber: false,
      },
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
    ...mapActions("auth", ["signIn"]),
    ...mapActions("auth", ["userName"]),

    onLogin() {
      this.submitted = true;
      if (!this.password) {
        this.errors.passwordEmpty = true;
      } else {
        this.errors.passwordEmpty = false;
      }

      if (isNaN(this.password)) {
        this.errors.passwordNumber = true;
      } else {
        this.errors.passwordNumber = false;
      }
      var errors = false;
      for (const key in this.errors) {
        if (this.errors[key]) {
          errors = true;
        }
      }

      if (!errors) {
        this.signIn(this.password, this.userName).then(() => {
          this.router.push({ name: "Home" });
          this.submitted = false;
        });
      }
    },
  },
};
</script>
