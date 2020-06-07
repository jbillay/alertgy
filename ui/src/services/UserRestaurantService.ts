import ApiService from "./ApiService";
import StorageService from "./StorageService";
import { AlertgyRestaurant, AlertgyUserRestaurant } from "@/types/alertgy";

const UserRestaurantService = {
  /**
   * Retrieve all restaurants own by the current user
   *
   * @returns restaurant list
   **/
  all: async function(): Promise<AlertgyRestaurant[]> {
    try {
      const user = StorageService.getUser();
      const userRestaurant: AlertgyRestaurant[] = [];
      const response = await ApiService.get(
        `/user-restaurants?user=${user._id}`
      );
      if (response.data.length > 0) {
        response.data.forEach((item: AlertgyUserRestaurant) => {
          userRestaurant.push(item.restaurant);
        });
      }
      return userRestaurant;
    } catch (error) {
      throw new Error(error.response.status);
    }
  },

  /**
   * Retrieve one restaurant own by the current user
   *
   * @returns restaurant
   **/
  one: async function(restaurantId: string): Promise<AlertgyRestaurant> {
    try {
      const user = StorageService.getUser();
      const response = await ApiService.get(
        `/user-restaurants?user=${user._id}&restaurant=${restaurantId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  },
};

export default UserRestaurantService;
