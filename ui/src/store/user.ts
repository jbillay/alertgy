import StorageService from "@/services/StorageService";
import UserService from "@/services/UserService";
import { AlertgyUser, AlertgyMessage } from "@/types/alertgy.d";

class State {
  public token: string;
  public user: AlertgyUser;

  constructor() {
    this.token = StorageService.getToken() || "";
    this.user = StorageService.getUser() || {};
  }
}

/*
 **
 ** ACTIONS
 **
 */
const loginAction = async function(context: any, userInfo: any): Promise<void> {
  try {
    const { jwt, user } = await UserService.login(userInfo);
    context.commit("userAuthSuccess", { jwt, user });
    context.commit("message/clearMessage", {}, { root: true });
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const logoutAction = function(context: any): void {
  context.commit("userLogout");
  UserService.logout();
};

const createAction = async function(
  context: any,
  userDetails: any
): Promise<void> {
  try {
    const { jwt, user } = await UserService.create(userDetails);
    context.commit("userAuthSuccess", { jwt, user });
    context.commit("message/clearMessage", {}, { root: true });
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    context.commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const updateAction = async function(
  context: any,
  userDetails: any
): Promise<void> {
  try {
    const user: AlertgyUser = await UserService.update(userDetails);
    context.commit("userUpdate", user);
    const messageInfo: AlertgyMessage = {
      type: "success",
      message: "User updated successfully",
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
const userAuthSuccessMutation = function(state: State, { jwt, user }: any) {
  state.token = jwt;
  state.user = user;
};

const userUpdateMutation = function(state: State, user: AlertgyUser) {
  state.user = user;
};

const userLogoutMutation = function(state: State) {
  state.token = "";
  state.user = {} as AlertgyUser;
};

/*
 **
 ** GETTERS
 **
 */
const isLoggedInGetter = function(state: State) {
  return !!state.token;
};

const userTypeGetter = function(state: State) {
  return state.user.role.name;
};

const userInfoGetter = function(state: State) {
  return state.user;
};

export default {
  namespaced: true,
  getters: {
    isLoggedIn: isLoggedInGetter,
    userType: userTypeGetter,
    userInfo: userInfoGetter,
  },
  mutations: {
    userAuthSuccess: userAuthSuccessMutation,
    userUpdate: userUpdateMutation,
    userLogout: userLogoutMutation,
  },
  actions: {
    login: loginAction,
    logout: logoutAction,
    create: createAction,
    update: updateAction,
  },
  state: new State(),
};
