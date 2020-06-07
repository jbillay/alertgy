<template>
  <div>
    <v-card class="mx-auto" max-width="700" outlined>
      <v-card-title>
        My Restaurants
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="userRestaurants"
        :search="search"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <span>
            <v-avatar>
              <img :src="url(item.logo[0].url)" />
            </v-avatar>
            <router-link :to="{ path: `/partner/restaurant/${item._id}` }">{{
              item.name
            }}</router-link>
          </span>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon color="red darken-1" @click="removeRestaurant(item)"
            >mdi-delete-outline</v-icon
          >
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-btn text dark color="teal white--text" @click="createNewRestaurant()">
          <span>Create new restaurant</span>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
      search: "",
      headers: [
        {
          text: "Restaurant",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "action",
        },
      ],
    };
  },
  methods: {
    url(pictUrl) {
      return new URL(pictUrl, this.imageRoot).href;
    },
    removeRestaurant(restaurant) {
      alert("Remove restaurant");
    },
    createNewRestaurant() {
      this.$router.push('/partner/restaurant/create');
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/userInfo"];
    },
    userRestaurants() {
      return this.$store.getters["userrestaurant/all"];
    },
  },
  async created() {
    await this.$store.dispatch("userrestaurant/get");
  },
};
</script>

<style lang="scss" scoped></style>
