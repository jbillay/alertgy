import { ActionContext } from "vuex";
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
const loginAction = async function(
  { commit }: ActionContext<State, State>,
  userInfo: any
): Promise<void> {
  try {
    const { jwt, user } = await UserService.login(userInfo);
    commit("userAuthSuccess", { jwt, user });
    commit("message/clearMessage", {}, { root: true });
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    commit("message/createMessage", messageInfo, { root: true });
    throw new Error(error);
  }
};

const logoutAction = function({ commit }: ActionContext<State, State>): void {
  commit("userLogout");
  UserService.logout();
};

const createAction = async function(
  { commit }: ActionContext<State, State>,
  userDetails: any
): Promise<void> {
  try {
    const { jwt, user } = await UserService.create(userDetails);
    commit("userAuthSuccess", { jwt, user });
    commit("message/clearMessage", {}, { root: true });
  } catch (error) {
    const messageInfo: AlertgyMessage = {
      type: "error",
      message: error.message,
    };
    commit("message/createMessage", messageInfo, { root: true });
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

const userInfoGetter = function(state: State) {
  return state.user;
};

export default {
  namespaced: true,
  getters: {
    isLoggedIn: isLoggedInGetter,
    userInfo: userInfoGetter,
  },
  mutations: {
    userAuthSuccess: userAuthSuccessMutation,
    userLogout: userLogoutMutation,
  },
  actions: {
    login: loginAction,
    logout: logoutAction,
    create: createAction,
  },
  state: new State(),
};
