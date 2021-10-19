<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
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
                v-show="this.errors.errorName && this.submitted"
                padding-left
              >
                Name is required
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
                v-show="this.errors.errorPin && this.submitted"
                padding-left
              >
                Pin is required
              </ion-text>
              <ion-text
                color="danger"
                v-show="this.errors.same && this.submitted"
                padding-left
              >
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
                v-show="this.errors.errorConfirmPin && this.submitted"
                padding-left
              >
                Pin is required
              </ion-text>
              <ion-text
                color="danger"
                v-show="this.errors.same && this.submitted"
                padding-left
              >
                Pin and confirmPin need to be the same
              </ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="4"> </ion-col>
          <ion-col size="4">
            <ion-button @click="clickRegister">
              Register
            </ion-button>
          </ion-col>
          <ion-col size="4"> </ion-col>
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
import { TokenService } from "../services/token.service";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";

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
        same: false,
      },
      pin: null,
      confirmPin: null,
      submitted: false,
    };
  },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  methods: {
    ...mapActions("auth", ["turnOffFirstTime", "setUserName", "setUserId"]),
    clickRegister() {
      this.submitted = true;

      if (isNaN(this.pin) || this.pin === null) {
        this.errors.errorPin = true;
      } else {
        this.errors.errorPin = false;
      }

      if (isNaN(this.confirmPin) || this.confirmPin === null) {
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
        //Save user and turn off first time;
        //TODO: Save User to API
        this.submitted = false;

        this.setUserName(this.name);
        this.setUserId(1);
        this.turnOffFirstTime();
        TokenService.saveToken("bla");
        this.router.push("/tabs/home");
      }
    },
  },
};
</script>
