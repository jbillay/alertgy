import { AlertgyAllergen } from "./../types/alertgy.d";
import { ActionContext } from "vuex";
import UserAllergenService from "@/services/UserAllergenService";
import { AlertgyUserAllergen, AlertgyMessage } from "@/types/alertgy.d";

class State {
  public allergenList: AlertgyUserAllergen[];

  constructor() {
    this.allergenList = [];
  }
}

/*
 **
 ** ACTIONS
 **
 */
const getUserAllergenAction = async function({
  commit,
}: ActionContext<State, State>): Promise<void> {
  try {
    const allergens = await UserAllergenService.all();
    commit("userAllergenSuccess", allergens);
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const addUserAllergenAction = async function(
  { commit }: ActionContext<State, State>,
  allergenList: AlertgyAllergen[]
) {
  try {
    const allergens = await UserAllergenService.add(allergenList);
    commit("userAllergenSuccess", allergens);
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

/*
 **
 ** MUTATIONS
 **
 */
const userAllergenSuccess = function(
  state: State,
  allergenList: AlertgyUserAllergen[]
) {
  state.allergenList = allergenList;
};

/*
 **
 ** GETTERS
 **
 */
const userAllergenGetter = function(state: State) {
  return state.allergenList;
};

export default {
  namespaced: true,
  getters: {
    all: userAllergenGetter,
  },
  mutations: {
    userAllergenSuccess: userAllergenSuccess,
  },
  actions: {
    get: getUserAllergenAction,
    add: addUserAllergenAction,
  },
  state: new State(),
};
