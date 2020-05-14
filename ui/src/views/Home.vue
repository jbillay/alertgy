<template>
  <div class="home">
    <Message />
    <v-card class="mx-auto" max-width="700" outlined>
      <v-card-title>
        My Allergens
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
        :items="userAllergens"
        :search="search"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <span>
            <v-avatar>
              <img :src="url(item.picto[0].url)" />
            </v-avatar>
            {{ item.name }}
          </span>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-btn text dark color="teal white--text" @click="goToAllergen()">
        <span>Add allergen to my profile</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";

export default {
  components: {
    Message,
  },
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
      search: "",
      headers: [
        {
          text: "Allergen",
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
    goToAllergen() {
      this.$router.push("/allergens");
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/userInfo"];
    },
    userAllergens() {
      return this.$store.getters["userallergen/all"];
    },
  },
  async created() {
    await this.$store.dispatch("userallergen/get");
  },
};
</script>
