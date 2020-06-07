<template>
  <div>
    <v-card>
      <v-card-title class="headline">Update my information</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                v-model="updatedUser.email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Firstname*"
                v-model="updatedUser.firstname"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Lastname*"
                v-model="updatedUser.lastname"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" text @click="cancelUpdate">
          Cancel
        </v-btn>
        <v-btn color="teal" text @click="submitUpdate">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    updatedUser() {
      return JSON.parse(JSON.stringify(this.user));
    },
  },
  methods: {
    submitUpdate() {
      this.$store.dispatch("user/update", this.updatedUser);
      this.$emit("updateDialog", false);
    },
    cancelUpdate() {
      this.$emit("updateDialog", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
