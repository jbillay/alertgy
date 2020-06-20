<template>
  <div>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Menu Item: {{ item.name }}</span>
        </v-card-title>
        {{ item }}
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="submitUpdate()"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="submitUpdate()">Save</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
    item: {
      type: Object,
    },
  },
  methods: {
    submitUpdate() {
      this.$emit("updateDialog", false);
    },
    cancelUpdate() {
      this.$emit("updateDialog", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
