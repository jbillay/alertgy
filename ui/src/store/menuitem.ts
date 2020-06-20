import MenuItemService from "@/services/MenuItemServices";
import {
  AlertgyMessage,
  AlertgyMenuItem,
  AlertgyRestaurant,
  AlertgyMenuCategory,
} from "@/types/alertgy.d";

interface AlertgyMenuInformation {
  restaurant: AlertgyRestaurant;
  categories: AlertgyMenuCategory[];
  menuItems: AlertgyMenuItem[];
}

interface AlertgyMenuItemPerCategory {
  category: AlertgyMenuCategory;
  items: AlertgyMenuItem[];
}

class State {
  public menuItemList: AlertgyMenuItem[];
  public menuItemCategories: AlertgyMenuCategory[];
  public menuRestaurant: AlertgyRestaurant;

  constructor() {
    this.menuItemList = [];
    this.menuItemCategories = [];
    this.menuRestaurant = {} as AlertgyRestaurant;
  }
}

/*
 **
 ** ACTIONS
 **
 */
const getMenuItemAction = async function(
  context: any,
  restaurantId: string
): Promise<void> {
  try {
    const menuItems: AlertgyMenuItem[] = await MenuItemService.all(
      restaurantId
    );
    const menuItemCategories: AlertgyMenuCategory[] = [];
    const menuRestaurant: AlertgyRestaurant = menuItems[0].restaurant;
    menuItems.sort(function(a, b) {
      return a.menu_category.order - b.menu_category.order;
    });
    menuItems.forEach((item: AlertgyMenuItem) => {
      if (
        menuItemCategories.findIndex(
          (x) => x.name === item.menu_category.name
        ) < 0
      ) {
        menuItemCategories.push(item.menu_category);
      }
    });
    const menuItemsPerCategory: AlertgyMenuItemPerCategory[] = [];
    menuItemCategories.forEach((category: AlertgyMenuCategory) => {
      const menuItemsParCurrentCategory: AlertgyMenuItem[] = [];
      menuItems.forEach((item: AlertgyMenuItem) => {
        if (item.menu_category.id === category.id) {
          menuItemsParCurrentCategory.push(item);
        }
      });
      menuItemsPerCategory.push({
        category: category,
        items: menuItemsParCurrentCategory,
      });
    });
    context.commit("menuItemSuccess", {
      restaurant: menuRestaurant,
      categories: menuItemCategories,
      menuItems: menuItemsPerCategory,
    });
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
const menuItemSuccessMutation = function(
  state: State,
  menuInformation: AlertgyMenuInformation
) {
  state.menuItemList = menuInformation.menuItems;
  state.menuItemCategories = menuInformation.categories;
  state.menuRestaurant = menuInformation.restaurant;
};

/*
 **
 ** GETTERS
 **
 */
const menuItemGetter = function(state: State) {
  return {
    restaurant: state.menuRestaurant,
    categories: state.menuItemCategories,
    items: state.menuItemList,
  };
};

export default {
  namespaced: true,
  getters: {
    all: menuItemGetter,
  },
  mutations: {
    menuItemSuccess: menuItemSuccessMutation,
  },
  actions: {
    get: getMenuItemAction,
  },
  state: new State(),
};
