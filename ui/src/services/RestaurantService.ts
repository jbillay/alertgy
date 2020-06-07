import ApiService from "./ApiService";
import { AlertgyRestaurant, AlertgyUserRestaurant } from "@/types/alertgy";

const RestaurantService = {
  /**
   * Retrieve all restaurants
   *
   * @returns restaurant list
   **/
  all: async function(): Promise<AlertgyRestaurant[]> {
    try {
      const response = await ApiService.get(`/restaurants`);
      return response.data as AlertgyRestaurant[];
    } catch (error) {
      throw new Error(error.response.status);
    }
  },

  /**
   * Retrieve one restaurant
   *
   * @returns restaurant
   **/
  get: async function(restaurantId: string): Promise<AlertgyRestaurant> {
    try {
      const response = await ApiService.get(`/restaurants/${restaurantId}`);
      return response.data as AlertgyRestaurant;
    } catch (error) {
      throw new Error(error.response.status);
    }
  },
};

export default RestaurantService;
