<template>
  <div>
    <LoadingSpinner v-if="isPending" />
    <v-card v-else color="teal" dark flat>
      <v-card-title class="text-center justify-center py-6">
        <v-flex class="d-flex justify-space-between mb-6">
          <h1 class="font-weight-bold display-3 basil--text ml-6">
            {{ menu.restaurant.name }}
          </h1>
          <v-switch
            v-model="showInvalid"
            class="mx-2"
            label="Show filtered"
          ></v-switch>
        </v-flex>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" grow show-arrows>
        <v-tab v-for="item in filteredMenu.items" :key="item.category.order">
          {{ item.category.name }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="itemList in filteredMenu.items"
            :key="itemList.key"
          >
            <v-card flat>
              <v-list two-line>
                <v-list-item-group active-class="teal--text">
                  <template v-for="(item, index) in itemList.items">
                    <v-list-item
                      :key="item.name"
                      v-if="item.valid || showInvalid"
                      :class="{ notAllow: !item.valid }"
                    >
                      <template v-slot:default="{}">
                        <v-list-item-content>
                          <v-list-item-title
                            class="pb-2 font-weight-medium"
                            v-text="item.name"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            class="text--primary"
                            v-text="item.description"
                          ></v-list-item-subtitle>
                          <div v-if="item.allergens.length > 0">
                            <v-divider vertical />
                            <v-list-item-subtitle>
                              Allergens
                              <v-row justify="space-around">
                                <v-list-item
                                  v-for="allergen in item.allergens"
                                  :key="allergen.name"
                                >
                                  <v-avatar>
                                    <img :src="url(allergen.picto[0].url)" />
                                  </v-avatar>
                                  {{ allergen.name }}
                                </v-list-item>
                              </v-row>
                            </v-list-item-subtitle>
                          </div>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                    <v-divider
                      v-if="item.valid && index < itemList.items.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
      isPending: true,
      tab: null,
      showInvalid: false,
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    url(pictUrl) {
      return new URL(pictUrl, this.imageRoot).href;
    },
  },
  computed: {
    filteredMenu() {
      this.menu.items.forEach((itemsPerCategory) => {
        itemsPerCategory.items.forEach((item) => {
          if (this.userAllergens.length === 0) {
            item.valid = true;
          } else {
            this.userAllergens.forEach((allergen) => {
              if (item.allergens.find(({ name }) => name === allergen.name)) {
                item.valid = false;
              } else {
                if (item.valid !== false) {
                  item.valid = true;
                }
              }
            });
          }
        });
      });
      return this.menu;
    },
    menu() {
      return this.$store.getters["menuitem/all"];
    },
    userAllergens() {
      return this.$store.getters["userallergen/all"];
    },
  },
  async created() {
    await this.$store.dispatch("menuitem/get", this.id);
    await this.$store.dispatch("userallergen/get");
    this.isPending = false;
  },
};
</script>

<style lang="scss" scoped>
.notAllow {
  background-color: #FF5252;
}
</style>
