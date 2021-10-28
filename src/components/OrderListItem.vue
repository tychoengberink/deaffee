<template>
  <ion-item @click="openDetails">
    <ion-label class="left"> Order {{ order.id }}</ion-label>
    <ion-label class="right">
      {{ order.payed ? "Payed" : "Not payed" }}
    </ion-label>
  </ion-item>
</template>

<script>
import {IonItem, IonLabel} from "@ionic/vue";
import {useRouter} from "vue-router";
import {mapActions} from "vuex";

export default {
  props: ["order"],
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
    ...mapActions("order", ["saveActiveOrder"]),

    async openDetails() {
      await this.saveActiveOrder(this.order.id);
      this.router.push({
        name: "OrderDetails",
      });
    },
  },
};
</script>
