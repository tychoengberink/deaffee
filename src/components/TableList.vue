<template>
  <ion-content>
    <ion-list>
      <table-list-item v-for="table in tables" :key="table.id" :table="table">
      </table-list-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonList, IonContent } from "@ionic/vue";
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
