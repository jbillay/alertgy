<template>
  <div>
    <v-alert
      v-model="alert"
      v-if="message.message"
      :type="message.type"
      dismissible
    >
      {{ message.message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    }
  },
  computed: {
    message() {
      return this.$store.getters["message/message"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
