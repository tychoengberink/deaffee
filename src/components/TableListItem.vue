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
import { useRouter } from "vue-router";

export default {
  props: ["table"],
  components: {
    IonItem,
    IonLabel,
  },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  methods: {
    ...mapActions("order", ["saveActiveTable"]),

    itemClick() {
      this.saveActiveTable(this.table.id);
      this.router.push({ name: "Orders" });
    },
  },
};
</script>
