import { AlertgyAllergen, AlertgyUserAllergen } from "@/types/alertgy.d";
import ApiService from "./ApiService";
import StorageService from "./StorageService";

const UserAllergenService = {
  /**
   * Retrieve all allergens for the current user
   *
   * @returns allergen list
   **/
  all: async function(): Promise<AlertgyAllergen[]> {
    try {
      const user = StorageService.getUser();
      const userAllergens: AlertgyAllergen[] = [];
      const response = await ApiService.get(`/user-allergens?user=${user._id}`);
      if (response.data.length > 0) {
        response.data.forEach((item: AlertgyUserAllergen) => {
          userAllergens.push(item.allergen);
        });
      }
      return userAllergens;
    } catch (error) {
      throw new Error(error.response.status);
    }
  },

  /**
   * Retrieve add one allergen to the current user
   *
   * @returns allergen
   **/
  add: async function(
    allergenList: AlertgyAllergen[]
  ): Promise<AlertgyAllergen[]> {
    const user = StorageService.getUser();
    allergenList.forEach(async (allergen: AlertgyAllergen) => {
      try {
        const element = { user: user._id, allergen: allergen._id };
        await ApiService.post("/user-allergens", element);
      } catch (error) {
        throw new Error(error.response.status);
      }
    });
    const userAllergens: AlertgyAllergen[] = await this.all();
    return userAllergens;
  },
};

export default UserAllergenService;

export { UserAllergenService };
