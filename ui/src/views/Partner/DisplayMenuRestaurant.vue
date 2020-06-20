<template>
  <div>
    <LoadingSpinner v-if="isPending" />
    <v-card v-else color="teal" dark flat>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">
          {{ menu.restaurant.name }}
        </h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" grow show-arrows>
        <v-tab v-for="item in menu.items" :key="item.category.order">
          {{ item.category.name }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="itemList in menu.items" :key="itemList.key">
            <v-card flat>
              <v-list two-line>
                <v-list-item-group active-class="teal--text">
                  <template v-for="(item, index) in itemList.items">
                    <v-list-item :key="item.name">
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

                        <v-list-item-action>
                          <v-chip-group column active-class="primary--text">
                            <v-chip
                              v-for="tag in item.menu_items_categories"
                              :key="tag.name"
                            >
                              {{ tag.name }}
                            </v-chip>
                          </v-chip-group>
                          <v-icon @click="editMenuItem(item)">
                            edit
                          </v-icon>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider
                      v-if="index + 1 < itemList.items.length"
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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <PartnerEditMenuItem
        :dialog="dialog"
        :item="editItem"
        v-on:updateDialog="updateDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import PartnerEditMenuItem from "@/components/Partner/PartnerEditMenuItem.vue";

export default {
  components: {
    PartnerEditMenuItem,
  },
  data() {
    return {
      imageRoot: process.env.VUE_APP_BACKEND_API,
      isPending: true,
      tab: null,
      dialog: false,
      editItem: null,
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
    editMenuItem(item) {
      this.editItem = item;
      this.dialog = true;
    },
    updateDialog(status) {
      this.dialog = status;
      this.editItem = null;
    },
  },
  computed: {
    menu() {
      return this.$store.getters["menuitem/all"];
    },
  },
  async created() {
    await this.$store.dispatch("menuitem/get", this.id);
    this.isPending = false;
  },
};

/*
            <v-list-item v-for="item in itemList.items" :key="item.name">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
*/
</script>

<style lang="scss" scoped></style>
