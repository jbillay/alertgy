<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="teal" dark flat>
        <v-toolbar-title>Welcome to AlertGy</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <Message />
        <v-form class="login">
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="mdi-email"
            v-model="email"
            type="text"
          />

          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            v-model="password"
            type="password"
            @keyup.enter="login"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark color="teal" @click="login">Login</v-btn>
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
  data() {
    return {
      email: "",
      password: "",
    };
  },
  props: {
    source: String,
  },
  methods: {
    login: function() {
      const { email, password } = this;
      this.$store
        .dispatch("user/login", {
          type: "user",
          identifier: email,
          password: password,
        })
        .then(() => {
          const redirectPath = this.$route.query.redirect || "/";
          this.$router.push(redirectPath);
        })
        .catch((err) => this.resetOnError());
    },
    resetOnError: function() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
