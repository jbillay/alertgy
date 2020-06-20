import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import * as vueMoment from "vue-moment";
import vuetify from "./plugins/vuetify";
import ApiService from "@/services/ApiService";
import StorageService from "@/services/StorageService";

import LoadingSpinner from "@/components/Utils/LoadingSpinner.vue";
import Message from "@/components/Utils/Message.vue";

Vue.component("LoadingSpinner", LoadingSpinner);
Vue.component("Message", Message);

Vue.config.productionTip = false;
Vue.use(vueMoment);

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_BACKEND_API);

// If token exists set header
if (StorageService.getToken()) {
  ApiService.setHeader();
}

const router = Router({ store });

//Sync vue-router's current $route as part of vuex store's state.
sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
