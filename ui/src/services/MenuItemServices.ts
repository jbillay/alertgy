import { AlertgyMenuItem } from "@/types/alertgy.d";
import ApiService from "./ApiService";

const MenuItemService = {
  /**
   * Retrieve all items for a restaurant
   *
   * @returns item list
   **/
  all: async function(restaurantId: string): Promise<AlertgyMenuItem[]> {
    try {
      const response = await ApiService.get(
        `/menu-items?restaurant=${restaurantId}`
      );
      return response.data as AlertgyMenuItem[];
    } catch (error) {
      throw new Error(error.response.status);
    }
  },
};

export default MenuItemService;
