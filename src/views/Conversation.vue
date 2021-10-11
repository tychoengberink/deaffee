<template>
  <ion-page>
    <ion-grid fixed>
      <ion-row class="ion-align-items-start cover-large">
        <ion-col>
          <conversation-list :items="conversation"/>
          <ion-fab vertical="bottom" horizontal="start">
            <ion-fab-button>
              <ion-icon :icon="chatboxOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>

          <ion-fab vertical="bottom" horizontal="end">
            <ion-fab-button>
              <ion-icon :icon="micOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="conversationOverviewClick">Show conversation</ion-button>
        </ion-col>
        <ion-col>
          <ion-button expand="block" @click="finishTalkingClick">Finish Talking</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<style lang="scss" scoped>
ion-grid {
  height: 100%;
  ion-row.cover-large {
    height: 90%;
    ion-col {
      height: 100%;
    }
  }
}
</style>

<script>
import {
  IonIcon,
  IonFab,
  IonFabButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";
import { micOutline, chatboxOutline } from "ionicons/icons";
import { mapGetters } from "vuex";
import ConversationList from '../components/ConversationList.vue';
import { useRouter } from "vue-router";


export default {
  name: "Conversation",
  components: {
    IonIcon,
    IonFab,
    IonFabButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonPage,
    ConversationList,
  },
 
  data() {
    return {
      conversation: ref([
        {
          id: 1,
          type: "waiter",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
        {
          id: 2,
          type: "waiter",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
        { id: 3, type: "customer", text: "asdf" },
        {
          id: 4,
          type: "customer",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
        { id: 5, type: "customer", text: "fds" },
        {
          id: 6,
          type: "customer",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
        {
          id: 7,
          type: "waiter",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
        {
          id: 8,
          type: "customer",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
        { id: 9, type: "waiter", text: "afsdv" },
        {
          id: 10,
          type: "customer",
          text:
            "asfasdfsffffffffafds fsdf asdfasdf sdfs dfds sdfsdf sdfsd fdsf sdsf sdfdf sd fs",
        },
      ]),
      micOutline,
      chatboxOutline,
    };
  },
  methods: {
    ...mapGetters("order", ["activeTable"]),

    conversationOverviewClick(){
      this.router.push("tabs/conversation/overview");
    }
  },
};
</script>
