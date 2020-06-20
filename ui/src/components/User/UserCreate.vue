<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="teal" dark flat>
        <v-toolbar-title>Welcome to AlertGy</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <Message />
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newUserForm.firstname"
            :rules="[rules.required]"
            label="Firstname"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUserForm.lastname"
            :rules="[rules.required]"
            label="Lastname"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUserForm.email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUserForm.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="newUserForm.confirmPassword"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, passwordMatch]"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            hint="Same than password"
            counter
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree with our term and conditions?"
            required
          ></v-checkbox>
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
import short from "short-uuid";

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    showConfirmPassword: false,
    newUserForm: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    rules: {
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    checkbox: false,
  }),
  props: {
    source: String,
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const translator = short();
        this.newUserForm.username = translator.generate();
        this.$store
          .dispatch("user/create", this.newUserForm)
          .then(() => this.$router.push("/"))
          .catch((err) => (this.reset()));
      }
    },
    reset() {
      // this.$refs.form.reset();
    }
  },
  computed: {
    passwordMatch() {
      return () =>
        this.newUserForm.password === this.newUserForm.confirmPassword ||
        "Passwords must match";
    },
  },
};
</script>

<style lang="scss" scoped></style>
