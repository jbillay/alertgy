<template>
  <div>
    <InfoRestaurant :id="this.id" type="Partner"/>
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
  },
};
</script>

<style lang="scss" scoped></style>
