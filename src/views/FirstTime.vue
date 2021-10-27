<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <br />
        <br />

        <ion-row>
          <ion-col>
            <ion-title>We need your firstname</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked" color="primary">Name</ion-label>
              <ion-input
                v-model="name"
                name="name"
                type="text"
                required
              ></ion-input>
              <ion-text
                color="danger"
                v-show="this.errors.errorName"
                padding-left
              >
                Name is required
              </ion-text>
              <ion-text color="danger" v-show="this.uniqueError" padding-left>
                Name is not unique!
              </ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <br />
        <br />
        <ion-row>
          <ion-col>
            <ion-title>For security reasons we need a pin</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked" color="primary">PIN</ion-label>
              <ion-input
                v-model="pin"
                name="pin"
                type="password"
                pattern="[0-9]*"
                required
              ></ion-input>
              <ion-text
                color="danger"
                v-show="this.errors.errorNumberPin"
                padding-left
              >
                Pin is not a number
              </ion-text>
              <ion-text
                color="danger"
                v-show="this.errors.errorPin"
                padding-left
              >
                Pin is required
              </ion-text>
              <ion-text color="danger" v-show="this.errors.same" padding-left>
                Pin and confirmPin need to be the same
              </ion-text>
            </ion-item>

            <ion-item>
              <ion-label position="stacked" color="primary"
                >Retype PIN</ion-label
              >
              <ion-input
                v-model="confirmPin"
                name="confirmPin"
                type="password"
                pattern="[0-9]*"
                required
              ></ion-input>
              <ion-text
                color="danger"
                v-show="this.errors.errorConfirmNumberPin"
                padding-left
              >
                Pin is not a number
              </ion-text>
              <ion-text
                color="danger"
                v-show="this.errors.errorConfirmPin"
                padding-left
              >
                Pin is required
              </ion-text>
              <ion-text color="danger" v-show="this.errors.same" padding-left>
                Pin and confirmPin need to be the same
              </ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12">
            <ion-button expand="block" @click="clickRegister">
              Register
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonText,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonText,
  },

  data() {
    return {
      name: null,
      errors: {
        errorName: false,
        errorPin: false,
        errorConfirmPin: false,
        errorNumberPin: false,
        errorConfirmNumberPin: false,
        same: false,
      },
      uniqueError: false,
      pin: null,
      confirmPin: null,
    };
  },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  computed: {
    ...mapGetters("auth", ["authenticating"]),
  },

  methods: {
    ...mapActions("auth", [
      "turnOffFirstTime",
      "setUserName",
      "signup",
      "signIn",
    ]),

    async clickRegister() {
      if (isNaN(this.pin)) {
        this.errors.errorNumberPin = true;
      } else {
        this.errors.errorNumberPin = false;
      }

      if (isNaN(this.confirmPin)) {
        this.errors.errorConfirmNumberPin = true;
      } else {
        this.errors.errorConfirmNumberPin = false;
      }

      if (this.pin === null) {
        this.errors.errorPin = true;
      } else {
        this.errors.errorPin = false;
      }

      if (this.confirmPin === null) {
        this.errors.errorConfirmPin = true;
      } else {
        this.errors.errorConfirmPin = false;
      }

      if (!this.name) {
        this.errors.errorName = true;
      } else {
        this.errors.errorName = false;
      }

      if (this.pin !== this.confirmPin) {
        this.errors.same = true;
      } else {
        this.errors.same = false;
      }
      var errors = false;
      for (const key in this.errors) {
        if (this.errors[key]) {
          errors = true;
        }
      }

      if (!errors) {
        let name = this.name;
        let pin = this.pin;

        await this.signup({
          username: name,
          password: pin,
        })
          .then(() => {
            this.setUserName(name);
            this.turnOffFirstTime();

            this.uniqueError = false;
            this.signIn(pin, name).then(() => {
              this.router.push({ name: "Home" });
            });
          })
          .catch((error) => {
            if (error.response.status === 500) {
              this.uniqueError = true;
            }
          });
      }
    },
  },
};
</script>
