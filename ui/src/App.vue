<template>
  <v-app>
    <v-content>
      <component :is="`${$route.meta.layout}Layout`">
        <router-view></router-view>
      </component>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  name: "App",
  components: { EmptyLayout, UserLayout }
};
</script>
