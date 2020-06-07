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
      alert: true,
    };
  },
  methods: {
    closeAtTime(time) {
      setInterval(() => this.$store.dispatch('message/clear'), time);
    },
  },
  computed: {
    message() {
      const messageInfo = this.$store.getters['message/message'];
      if (messageInfo.time) {
        this.closeAtTime(messageInfo.time);
      }
      return messageInfo;
    },
  },
};
</script>

<style lang="scss" scoped></style>
