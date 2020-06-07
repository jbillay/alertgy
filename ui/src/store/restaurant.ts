import { ActionContext } from "vuex";
import restaurantService from "@/services/RestaurantService";
import { AlertgyMessage, AlertgyRestaurant } from "@/types/alertgy.d";

class State {
  public restaurants: AlertgyRestaurant[];
  public restaurant: AlertgyRestaurant;

  constructor() {
    this.restaurants = [];
    this.restaurant = {} as AlertgyRestaurant;
  }
}

/*
 **
 ** ACTIONS
 **
 */
const getAllRestaurantAction = async function(context: any): Promise<void> {
  try {
    const restaurants: AlertgyRestaurant[] = await restaurantService.all();
    context.commit("allRestaurantsSuccess", restaurants);
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const getRestaurantAction = async function(
  context: any,
  restaurantId: string
): Promise<void> {
  try {
    const restaurant: AlertgyRestaurant = await restaurantService.get(
      restaurantId
    );
    context.commit("oneRestaurantSuccess", restaurant);
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
const allRestaurantsSuccessMutation = function(
  state: State,
  restaurants: AlertgyRestaurant[]
) {
  state.restaurants = restaurants;
};

const oneRestaurantSuccessMutation = function(
  state: State,
  restaurant: AlertgyRestaurant
) {
  state.restaurant = restaurant;
};

/*
 **
 ** GETTERS
 **
 */
const allRestaurantGetter = function(state: State) {
  return state.restaurants;
};

const oneRestaurantGetter = function(state: State, restaurantId: string) {
  return state.restaurant;
};

export default {
  namespaced: true,
  getters: {
    all: allRestaurantGetter,
    one: oneRestaurantGetter,
  },
  mutations: {
    allRestaurantsSuccess: allRestaurantsSuccessMutation,
    oneRestaurantSuccess: oneRestaurantSuccessMutation,
  },
  actions: {
    getAll: getAllRestaurantAction,
    get: getRestaurantAction,
  },
  state: new State(),
};
