import UserAllergenService from "@/services/UserAllergenService";
import { AlertgyAllergen, AlertgyMessage } from "@/types/alertgy.d";

class State {
  public allergenList: AlertgyAllergen[];

  constructor() {
    this.allergenList = [];
  }
}

/*
 **
 ** ACTIONS
 **
 */
const getUserAllergenAction = async function(context: any): Promise<void> {
  try {
    const allergens: AlertgyAllergen[] = await UserAllergenService.all();
    context.commit("userAllergenSuccess", allergens);
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const addUserAllergenAction = async function(
  context: any,
  allergenList: AlertgyAllergen[]
) {
  try {
    const newAllergenList = await UserAllergenService.add(allergenList);
    context.commit("userAllergenSuccess", newAllergenList);
    const messageInfo: AlertgyMessage = {
      type: "success",
      message: "Allergen(s) added successfully",
      time: 5000,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const removeUserAllergenAction = async function(
  context: any,
  allergenList: AlertgyAllergen[]
) {
  try {
    const newAllergenList = await UserAllergenService.remove(allergenList);
    context.commit("userAllergenSuccess", newAllergenList);
    const messageInfo: AlertgyMessage = {
      type: "success",
      message: "Allergen(s) removed successfully",
      time: 5000,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

/*
 **
 ** MUTATIONS
 **
 */
const userAllergenSuccessMutation = function(
  state: State,
  allergenList: AlertgyAllergen[]
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
    userAllergenSuccess: userAllergenSuccessMutation,
  },
  actions: {
    get: getUserAllergenAction,
    add: addUserAllergenAction,
    remove: removeUserAllergenAction,
  },
  state: new State(),
};
