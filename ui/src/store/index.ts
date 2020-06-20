import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import message from "./message";
import allergen from "./allergen";
import restaurant from "./restaurant";
import userallergen from "./userallergen";
import userrestaurant from "./userrestaurant";
import menuitem from "./menuitem";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    message,
    allergen,
    restaurant,
    userallergen,
    userrestaurant,
    menuitem,
  },
  strict: debug,
});
