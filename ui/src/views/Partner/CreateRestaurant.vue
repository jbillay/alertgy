<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="teal" dark flat>
        <v-toolbar-title>Create New Restaurant</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <Message />
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newRestaurantForm.name"
            :rules="[rules.required]"
            label="Restaurant Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="newRestaurantForm.email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" class="mr-4" @click="reset">
          Cancel
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Message from "@/components/Utils/Message.vue";

export default {
  components: {
    Message,
  },
  data: () => ({
    valid: true,
    newRestaurantForm: {
      name: "",
      email: "",
    },
    rules: {
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      required: (value) => !!value || "Required.",
      min8: (v) => v.length >= 8 || "Min 8 characters",
    },
    checkbox: false,
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        alert("Create this restaurant");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
