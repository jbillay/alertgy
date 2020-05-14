import ApiService from "./ApiService";
import { AlertgyAllergen } from '@/types/alertgy.d';

interface ResponseAllergens {
  data?: AlertgyAllergen[];
}

interface ResponseAllergen {
  data?: AlertgyAllergen;
}

// class AllergenError extends Error {
//   public errorCode: string;
//   constructor(errorCode: string, message: string) {
//     super(message);
//     this.name = this.constructor.name;
//     this.message = message;
//     this.errorCode = errorCode;
//   }
// }

const AllergenService = {
  /**
   * Retrieve all allergens
   *
   * @returns allergen list
   **/
  all: async function(): Promise<AlertgyAllergen[]> {
    try {
      const response: ResponseAllergens = await ApiService.get("allergens");
      return response.data as AlertgyAllergen[];
    } catch (error) {
      throw new Error(error.response.status);
    }
  },

  /**
   * Retrieve one allergen
   *
   * @returns allergen
   **/
  get: async function(allergenId: string): Promise<AlertgyAllergen> {
    if (allergenId) {
      try {
        const response: ResponseAllergen = await ApiService.get(
          "allergens/" + allergenId
        );
        return response.data as AlertgyAllergen;
      } catch (error) {
        throw new Error(error.response.status);
      }
    } else {
      throw new Error("Allergen Id is required");
    }
  }
};

export default AllergenService;

export { AllergenService };
