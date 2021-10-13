<template>
  <ion-content>
            <ion-list>
              <DynamicScroller
                class="scroller"
                :items="items"
                :min-item-size="10"
              >
                <template v-slot="{ item, index, active }">
                  <DynamicScrollerItem
                    :item="item"
                    :active="active"
                    :size-dependencies="[item.text]"
                    :data-index="index"
                  >
                    <div v-if="item.type == 'waiter'" class="sentence-left">
                      {{ item.text }}
                    </div>
                    <div v-if="item.type == 'customer'" class="sentence-right">
                      {{ item.text }}
                    </div>
                  </DynamicScrollerItem>
                </template>
              </DynamicScroller>
            </ion-list>
          </ion-content>
</template>

<script>
import {
  IonList,
  IonContent,
} from "@ionic/vue";

export default {
 name: "ConversationList",
  components: {
    IonList,
    IonContent
  },
  props: {
      items: Array
  }
}
//TODO: add text to speech per line
</script>

<style>

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