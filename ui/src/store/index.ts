import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import message from "./message";
import allergen from "./allergen";
import userallergen from "./userallergen";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    message,
    allergen,
    userallergen,
  },
  strict: debug,
});
