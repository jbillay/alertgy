import { ActionContext } from "vuex";
import AllergenService from "@/services/AllergenService";
import { AlertgyAllergen, AlertgyMessage } from "@/types/alertgy.d";

class State {
  public allergens: AlertgyAllergen[];

  constructor() {
    this.allergens = [];
  }
}

/*
 **
 ** ACTIONS
 **
 */
const allergensAction = async function({
  commit,
}: ActionContext<State, State>): Promise<void> {
  try {
    const allergens: AlertgyAllergen[] = await AllergenService.all();
    commit("allergenSuccess", allergens);
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
const allergenSuccessMutation = function(
  state: State,
  allergens: AlertgyAllergen[]
) {
  state.allergens = allergens;
};

/*
 **
 ** GETTERS
 **
 */
const allergensGetter = function(state: State) {
  return state.allergens;
};

export default {
  namespaced: true,
  getters: {
    all: allergensGetter,
  },
  mutations: {
    allergenSuccess: allergenSuccessMutation,
  },
  actions: {
    all: allergensAction,
  },
  state: new State(),
};
