<template>
  <ion-page>
    <ion-content padding>
      <form @submit.prevent="onLogin" novalidate>
        <ion-grid>
          <ion-row>
            <ion-col align-self-center size-lg="12" size-md="12" size-xs="12">
              <ion-img :src="require('@/images/logo.png')"></ion-img>

              <ion-item text-center>
                <ion-label color="primary" position="stacked"
                  >Your pincode
                </ion-label>
                <ion-input
                  data-cy="password"
                  name="password"
                  required
                  type="password"
                  v-model="password"
                ></ion-input>
              </ion-item>
              <ion-text
                color="danger"
                padding-left
                v-show="this.errors.passwordNumber && this.submitted"
              >
                Pincode needs to be a number!
              </ion-text>
              <ion-text
                color="danger"
                padding-left
                v-show="this.passwordWrong && this.submitted"
              >
                Pincode is wrong!
              </ion-text>
              <ion-text
                color="danger"
                padding-left
                v-show="this.errors.passwordEmpty && this.submitted"
              >
                Pincode cant be empty!
              </ion-text>

              <ion-button expand="block" type="submit">Login</ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col align-self-center size-lg="12" size-md="12" size-xs="12">
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
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
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
      passwordWrong: false,
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
        this.passwordWrong = false;
        this.signIn(this.password, this.userName)
          .then(() => {
            this.router.push({ name: "Home" });
            this.submitted = false;
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 400) {
              this.passwordWrong = true;
            }
          });
      }
    },
  },
};
</script>
