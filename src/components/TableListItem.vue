<template>
  <ion-item @click="itemClick">
    <ion-label>
      {{ table.id }}
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonLabel } from "@ionic/vue";
import { mapActions } from "vuex";

export default {
  props: ["table"],
  components: {
    IonItem,
    IonLabel,
  },
  methods: {
    ...mapActions("order", ["saveActiveTable"]),
    itemClick() {
      this.saveActiveTable(this.table.id);
      this.r
    },
  },
};
</script>
