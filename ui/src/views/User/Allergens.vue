<template>
  <div>
    <LoadingSpinner v-if="isPending" />
    <v-container v-else>
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
          :items="filteredAllergen"
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
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
      isPending: true,
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
    allAllergens() {
      return this.$store.getters["allergen/all"];
    },
    userAllergens() {
      return this.$store.getters["userallergen/all"];
    },
    filteredAllergen() {
      return this.allAllergens.filter((allergen) => {
        return !this.userAllergens.find(
          (userAllergen) => userAllergen.id === allergen.id
        );
      });
    },
  },
  methods: {
    url(pictUrl) {
      return new URL(pictUrl, this.imageRoot).href;
    },
    addToUserProfile() {
      if (this.selected.length > 0) {
        this.$store.dispatch("userallergen/add", this.selected);
        this.selected = [];
      } else {
        const userMsg = {
          type: "warning",
          message: "Please select at least one allergen",
          time: 3000,
        };
        this.$store.dispatch("message/send", userMsg);
      }
    },
  },
  async created() {
    await this.$store.dispatch("allergen/all");
    await this.$store.dispatch("userallergen/get");
    this.isPending = false;
  },
};
</script>

<style lang="scss" scoped></style>
