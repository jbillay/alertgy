<template>
  <div>
    <Message />
    <v-card class="mx-auto" max-width="700" outlined>
      <v-card-title>
        Allergens
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
        v-model="selected"
        :headers="headers"
        :items="allergens"
        :search="search"
        item-key="name"
        show-select
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
      <div class="text-center pt-2">
        <v-btn text dark color="teal white--text" @click="addToUserProfile()">
          <span>Add selection to my profile</span>
        </v-btn>
      </div>
    </v-card>
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
      selected: [],
      headers: [
        {
          text: "Allergen not in profile",
          align: "start",
          sortable: true,
          value: "name",
        },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/userInfo"];
    },
    allergens() {
      return this.$store.getters["allergen/all"];
    },
  },
  methods: {
    url(pictUrl) {
      return new URL(pictUrl, this.imageRoot).href;
    },
    addToUserProfile() {
      this.$store.dispatch("userallergen/add", this.selected);
    }
  },
  async created() {
    await this.$store.dispatch("allergen/all");
  },
};
</script>

<style lang="scss" scoped></style>
