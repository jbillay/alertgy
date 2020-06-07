<template>
  <div>
    <v-card class="mx-auto my-12" max-width="374">
      <v-img :src="url(restaurant.logo[0].url)"></v-img>

      <v-card-title>{{ restaurant.name }}</v-card-title>

      <v-card-text>
        <div>
          {{ restaurant.description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Contact</v-card-title>

      <v-card-text>
        <p>
          <strong>Address: </strong>
          <span>
            {{ restaurant.street }} {{ restaurant.zipcode }}
            {{ restaurant.city }}
          </span>
        </p>
        <p>
          <strong>Website: </strong>
          <span>
            <a :href="restaurant.web" target="_blank">{{ restaurant.web }}</a>
          </span>
        </p>
        <p>
          <strong>Email: </strong>
          <span>
            <a :href="`mailto:${restaurant.email}`" target="_blank">{{ restaurant.email }}</a>
          </span>
        </p>
        <p>
          <strong>Phone: </strong>
          <span>
            {{ restaurant.phone }}
          </span>
        </p>
      </v-card-text>

      <v-card-actions>
        <component :is="`${type}ActionRestaurant`" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PartnerActionRestaurant from "@/components/Partner/PartnerActionRestaurant.vue";

export default {
  components: {
    PartnerActionRestaurant,
  },
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
    };
  },
  props: {
    id: { type: String },
    type: { type: String },
  },
  methods: {
    url(pictUrl) {
      return new URL(pictUrl, this.imageRoot).href;
    },
  },
  computed: {
    restaurant() {
      return this.$store.getters["restaurant/one"];
    },
  },
  async created() {
    await this.$store.dispatch("restaurant/get", this.id);
  },
};
</script>

<style lang="scss" scoped></style>
