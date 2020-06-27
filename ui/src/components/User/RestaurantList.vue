<template>
  <div>
    <LoadingSpinner v-if="isPending" />
    <v-card v-else class="mx-auto" max-width="700" outlined>
      <v-card-title>
        Restaurants
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
        :items="restaurants"
        :search="search"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <span>
            <v-avatar class="mr-2">
              <img :src="url(item.logo[0].url)" />
            </v-avatar>
            <router-link
              class="{text-decoration: none;}"
              :to="{ path: `/restaurant/${item._id}` }"
              >{{ item.name }}</router-link
            >
          </span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
      isPending: true,
      search: "",
      headers: [
        {
          text: "Restaurant",
          align: "start",
          sortable: true,
          value: "name",
        },
      ],
    };
  },
  methods: {
    url(pictUrl) {
      return new URL(pictUrl, this.imageRoot).href;
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/userInfo"];
    },
    restaurants() {
      return this.$store.getters["restaurant/all"];
    },
  },
  async created() {
    await this.$store.dispatch("restaurant/getAll");
    this.isPending = false;
  },
};
</script>

<style lang="scss" scoped></style>
