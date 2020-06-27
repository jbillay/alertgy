<template>
  <div>
    <v-btn color="teal" text @click="showMenu()">
      Show Menu
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String },
  },
  methods: {
    showMenu() {
      this.$router.push(`/restaurant/${this.id}/menu`);
    }
  },
};
</script>

<style lang="scss" scoped></style>
