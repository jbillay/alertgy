import UserRestaurantService from "@/services/UserRestaurantService";
import { AlertgyMessage, AlertgyRestaurant } from "@/types/alertgy.d";

class State {
  public restaurantList: AlertgyRestaurant[];

  constructor() {
    this.restaurantList = [];
  }
}

/*
 **
 ** ACTIONS
 **
 */
const getUserRestaurantAction = async function(context: any): Promise<void> {
  try {
    const restaurants: AlertgyRestaurant[] = await UserRestaurantService.all();
    context.commit("userRestaurantSuccess", restaurants);
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
const userRestaurantSuccessMutation = function(
  state: State,
  restaurantList: AlertgyRestaurant[]
) {
  state.restaurantList = restaurantList;
};

/*
 **
 ** GETTERS
 **
 */
const userRestaurantGetter = function(state: State) {
  return state.restaurantList;
};

export default {
  namespaced: true,
  getters: {
    all: userRestaurantGetter,
  },
  mutations: {
    userRestaurantSuccess: userRestaurantSuccessMutation,
  },
  actions: {
    get: getUserRestaurantAction,
  },
  state: new State(),
};
