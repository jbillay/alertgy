import { ActionContext } from "vuex";
import { AlertgyMessage } from "@/types/alertgy.d";

class State {
  public message: AlertgyMessage;

  constructor() {
    this.message = {} as AlertgyMessage;
  }
}

/*
 **
 ** ACTIONS
 **
 */
const sendMessageAction = function(
  { commit }: ActionContext<State, State>,
  messageInfo: AlertgyMessage
): void {
  commit("createMessage", messageInfo);
};

/*
 **
 ** MUTATIONS
 **
 */

const createMessageMutation = function(state: State, messageInfo: any) {
  state.message = messageInfo;
};

const clearMessageMutation = function(state: State) {
  state.message = {} as AlertgyMessage;
};
/*
 **
 ** GETTERS
 **
 */
const messageGetter = function(state: State) {
  return state.message;
};

export default {
  namespaced: true,
  getters: {
    message: messageGetter,
  },
  mutations: {
    createMessage: createMessageMutation,
    clearMessage: clearMessageMutation
  },
  actions: {
    sendMessage: sendMessageAction,
  },
  state: new State(),
};
