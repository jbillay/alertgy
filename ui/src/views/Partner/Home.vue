<template>
  <div>
    <v-container>
      <Message />
      <PartnerRestaurants />
    </v-container>
  </div>
</template>

<script>
import Message from "@/components/Utils/Message.vue";
import PartnerRestaurants from "@/components/Partner/PartnerRestaurants.vue";
export default {
  components: {
    Message,
    PartnerRestaurants,
  },
};
</script>

<style lang="scss" scoped></style>
