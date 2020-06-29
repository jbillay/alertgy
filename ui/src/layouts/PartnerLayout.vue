<template>
  <v-app>
    <Navbar />
    <slot></slot>
  </v-app>
</template>

<script>
import Navbar from "@/components/Partner/PartnerNavbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped></style>
