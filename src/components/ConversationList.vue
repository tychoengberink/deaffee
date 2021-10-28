<template>
  <ion-content>
    <ion-list>
      <DynamicScroller :items="items" :min-item-size="10" class="scroller">
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
              :active="active"
              :data-index="index"
              :item="item"
              :size-dependencies="[item.text]"
          >
            <div>
              <div :class="item.isClient ? 'sentence-right' : 'sentence-left'">
                {{ item.text }}
                <br>
                <ion-button @click="textToSpeech(item.text)" size="small">
                  <ion-icon :icon="volumeHighOutline"/>
                </ion-button>
              </div>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </ion-list>
  </ion-content>
</template>

<script>
import {IonButton, IonContent, IonIcon, IonList} from "@ionic/vue";
import {volumeHighOutline} from "ionicons/icons";
import {TextToSpeech} from "@ionic-native/text-to-speech";

export default {
  name: "ConversationList",
  components: {
    IonList,
    IonContent,
    IonButton,
    IonIcon,
  },
  props: {
    items: Array,
  },

  setup() {
    return {
      volumeHighOutline,
    };
  },

  methods: {
    textToSpeech(sentence) {
      TextToSpeech.speak({text: sentence, locale: "en-US"});
    },
  },
};
</script>

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


.sentence-left {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 30px;
}

.sentence-right {
  text-align: right;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 30px;
}
</style>
