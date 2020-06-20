<template>
  <div>
    <v-container>
      <Message />
      <PartnerRestaurants />
    </v-container>
  </div>
</template>

<script>
import PartnerRestaurants from "@/components/Partner/PartnerRestaurants.vue";
export default {
  components: {
    PartnerRestaurants,
  },
};
</script>

<style lang="scss" scoped></style>
