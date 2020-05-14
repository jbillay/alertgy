<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <img class="" src="./../assets/logo.png" alt="" />
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <component :is="currentForm.component" />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-btn text dark color="teal white--text" @click="switchForm()">
              <span>Create New Account</span>
            </v-btn>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserLogin from "@/components/UserLogin.vue";
import UserCreate from "@/components/UserCreate.vue";

export default {
  components: {
    UserLogin, UserCreate
  },
  data() {
    return {
      currentForm: { component: "UserLogin", switchTo: "UserCreate"}
    };
  },
  methods: {
    switchForm() {
      const currentForm = this.currentForm.component;
      this.currentForm.component = this.currentForm.switchTo;
      this.currentForm.switchTo = currentForm;
    }
  },
};
</script>
