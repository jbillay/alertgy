<template>
  <div>
    <Navbar />
    <slot></slot>
  </div>
</template>

<script>
import Navbar from "@/components/User/UserNavbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped></style>
