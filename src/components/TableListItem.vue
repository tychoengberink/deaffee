<template>
  <ion-item @click="itemClick">
    <ion-label>
      {{table.id}}
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonLabel } from "@ionic/vue";
export default {
  props: ["table"],
  components: {
    IonItem,
    IonLabel,
  },
   methods: {
    itemClick(){
       
    }
   }
};
</script>