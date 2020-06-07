<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <img class="" src="@/assets/logo.png" alt="" />
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <component :is="currentForm.component" />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-btn text dark color="primary white--text" @click="switchForm()">
              <span>{{ currentText.text }}</span>
            </v-btn>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PartnerLogin from "@/components/Partner/PartnerLogin.vue";
import PartnerCreate from "@/components/Partner/PartnerCreate.vue";

export default {
  components: {
    PartnerLogin, PartnerCreate
  },
  data() {
    return {
      currentForm: { component: "PartnerLogin", switchTo: "PartnerCreate"},
      currentText: { text: "Create New Account", switchTo: "Back to login"}
    };
  },
  methods: {
    switchForm() {
      const currentForm = this.currentForm.component;
      const currentText = this.currentText.text;
      this.currentForm.component = this.currentForm.switchTo;
      this.currentForm.switchTo = currentForm;
      this.currentText.text = this.currentText.switchTo;
      this.currentText.switchTo = currentText;
    }
  },
};
</script>
