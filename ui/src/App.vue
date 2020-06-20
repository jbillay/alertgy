<template>
  <v-app>
    <ErrorBoundary>
      <v-content>
        <component :is="`${$route.meta.layout}Layout`">
          <router-view></router-view>
        </component>
      </v-content>
    </ErrorBoundary>
  </v-app>
</template>

<script>
// @ is an alias to /src
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import PartnerLayout from "@/layouts/PartnerLayout.vue";
import ErrorBoundary from "@/components/Utils/ErrorBoundary";

export default {
  name: "App",
  components: { EmptyLayout, UserLayout, PartnerLayout, ErrorBoundary },
};
</script>
