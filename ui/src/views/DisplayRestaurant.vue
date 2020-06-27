<template>
  <div>
    <InfoRestaurant :id="this.id" :type="this.type" />
  </div>
</template>

<script>
import InfoRestaurant from "@/components/Global/InfoRestaurant.vue";

export default {
  components: {
    InfoRestaurant,
  },
  props: {
    id: {
      type: String,
    },
    type: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
