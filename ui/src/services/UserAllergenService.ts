import { AlertgyUser } from "@/types/alertgy.d";
import { AlertgyAllergen, AlertgyUserAllergen } from "@/types/alertgy.d";
import ApiService from "./ApiService";
import StorageService from "./StorageService";
import AlertgyError from "./AlertgyErrorService";

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
   * Retrieve all allergens for specific user
   *
   * @returns allergen list
   **/
  public: async function(username: string): Promise<AlertgyAllergen[]> {
    const userAllergens: AlertgyAllergen[] = [];
    const responseUser = await ApiService.get(
      `/users?_limit=1&username=${username}`
    );
    if (responseUser.data.length < 1) {
      throw new AlertgyError("User Not Found");
    } else {
      const user: AlertgyUser = responseUser.data[0];
      const responseAllergen = await ApiService.get(
        `/user-allergens?user=${user._id}`
      );
      if (responseAllergen.data.length > 0) {
        responseAllergen.data.forEach((item: AlertgyUserAllergen) => {
          userAllergens.push(item.allergen);
        });
      }
      return userAllergens;
    }
  },
  /**
   * Retrieve one allergen for the current user (AlertgyUserAllergen[])
   *
   * @returns allergen list
   **/
  one: async function(allergenId: string): Promise<AlertgyUserAllergen[]> {
    try {
      const user = StorageService.getUser();
      const response = await ApiService.get(
        `/user-allergens?user=${user._id}&allergen=${allergenId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  },

  /**
   * Retrieve add allergen(s) to the current user
   *
   * @returns allergen
   **/
  add: async function(
    allergenList: AlertgyAllergen[]
  ): Promise<AlertgyAllergen[]> {
    const user = StorageService.getUser();
    try {
      await Promise.all(
        allergenList.map(async (allergen: AlertgyAllergen) => {
          const element = { user: user._id, allergen: allergen._id };
          await ApiService.post("/user-allergens", element);
        })
      );
    } catch (error) {
      throw new Error(error.response.status);
    }
    const userAllergens: AlertgyAllergen[] = await this.all();
    return userAllergens;
  },

  /**
   * Retrieve remove allergen(s) to the current user
   *
   * @returns allergen
   **/
  remove: async function(
    allergenList: AlertgyAllergen[]
  ): Promise<AlertgyAllergen[]> {
    try {
      await Promise.all(
        allergenList.map(async (allergen: AlertgyAllergen) => {
          const userAllergenList: AlertgyUserAllergen[] = await this.one(
            allergen._id
          );
          await Promise.all(
            userAllergenList.map(async (userAllergen: AlertgyUserAllergen) => {
              await ApiService.delete(
                `/user-allergens/${userAllergen._id}`,
                {}
              );
            })
          );
        })
      );
    } catch (error) {
      throw new Error(error.response.status);
    }
    const userAllergens: AlertgyAllergen[] = await this.all();
    return userAllergens;
  },
};

export default UserAllergenService;

export { UserAllergenService };
