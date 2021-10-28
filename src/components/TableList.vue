<template>
  <ion-content>
    <ion-list>
      <table-list-item :key="table.id" :table="table" v-for="table in tables">
      </table-list-item>
    </ion-list>
  </ion-content>
</template>

<script>
import {IonContent, IonList} from "@ionic/vue";
import TableListItem from "./TableListItem.vue";

export default {
  name: "ConversationList",
  components: {
    IonList,
    IonContent,
    TableListItem,
  },
  props: {
    tables: Array,
  },
};
</script>
