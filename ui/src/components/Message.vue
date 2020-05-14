<template>
  <div>
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters["message/message"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
