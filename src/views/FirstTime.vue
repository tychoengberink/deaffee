<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <br/>
        <br/>

        <ion-row>
          <ion-col>
            <ion-title>We need your firstname</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label color="primary" position="stacked">Name</ion-label>
              <ion-input
                  data-cy="name"
                  name="name"
                  required
                  type="text"
                  v-model="name"
              ></ion-input>
              <ion-text
                  color="danger"
                  padding-left
                  v-show="this.errors.errorName"
              >
                Name is required
              </ion-text>
              <ion-text color="danger" padding-left v-show="this.uniqueError">
                Name is not unique!
              </ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <br/>
        <br/>
        <ion-row>
          <ion-col>
            <ion-title>For security reasons we need a pin</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label color="primary" position="stacked">PIN</ion-label>
              <ion-input
                  data-cy="pin"
                  name="pin"
                  pattern="[0-9]*"
                  required
                  type="password"
                  v-model="pin"
              ></ion-input>
              <ion-text
                  color="danger"
                  padding-left
                  v-show="this.errors.errorNumberPin"
              >
                Pin is not a number
              </ion-text>
              <ion-text
                  color="danger"
                  padding-left
                  v-show="this.errors.errorPin"
              >
                Pin is required
              </ion-text>
              <ion-text
                  color="danger"
                  data-cy="errorSame"
                  padding-left
                  v-show="this.errors.same"
              >
                Pin and confirmPin need to be the same
              </ion-text>
            </ion-item>

            <ion-item>
              <ion-label color="primary" position="stacked"
              >Retype PIN
              </ion-label
              >
              <ion-input
                  data-cy="confirmPin"
                  name="confirmPin"
                  pattern="[0-9]*"
                  required
                  type="password"
                  v-model="confirmPin"
              ></ion-input>
              <ion-text
                  color="danger"
                  padding-left
                  v-show="this.errors.errorConfirmNumberPin"
              >
                confirmPin is not a number
              </ion-text>
              <ion-text
                  color="danger"
                  padding-left
                  v-show="this.errors.errorConfirmPin"
              >
                confirmPin is required
              </ion-text>
              <ion-text
                  color="danger"
                  data-cy="errorSame"
                  padding-left
                  v-show="this.errors.same"
              >
                Pin and confirmPin need to be the same
              </ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12">
            <ion-button @click="clickRegister" expand="block">
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
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/vue";
import {useRouter} from "vue-router";
import {mapActions, mapGetters} from "vuex";

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

    clickRegister() {
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

        let signUp = this.signup({
          username: name,
          password: pin,
        });
        signUp
            .then(() => {
              this.setUserName(name);
              this.turnOffFirstTime();
              this.uniqueError = false;

              let signIn = this.signIn(pin, name);
              signIn.then(() => {
                this.router.push("/tabs/home");
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
