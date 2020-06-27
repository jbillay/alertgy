<template>
  <div class="home">
    <v-container>
      <Message />
      <v-row no-gutters justify="space-between">
        <v-col cols="6">
          <MyAllergen class="pa-2" />
        </v-col>
        <v-col cols="6">
          <RestaurantList class="pa-2" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MyAllergen from "@/components/User/MyAllergen.vue";
import RestaurantList from "@/components/User/RestaurantList.vue";

export default {
  components: {
    MyAllergen,
    RestaurantList,
  },
};
</script>
