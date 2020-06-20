<template>
  <div>
    <v-btn color="teal" text @click="showMenu()">
      Menu
    </v-btn>
    <v-btn color="teal" text>
      EDIT
    </v-btn>
    <v-btn color="teal" text>
      REMOVE
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
      this.$router.push(`/partner/restaurant/${this.id}/menu`);
    }
  },
};
</script>

<style lang="scss" scoped></style>
