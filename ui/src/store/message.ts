import { ActionContext } from 'vuex';
import { AlertgyMessage } from '@/types/alertgy.d';

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
  context: any,
  messageInfo: AlertgyMessage
): void {
  context.commit('createMessage', messageInfo);
};

const clearMessageAction = function(context: any): void {
  context.commit("clearMessage");
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
    clearMessage: clearMessageMutation,
  },
  actions: {
    send: sendMessageAction,
    clear: clearMessageAction,
  },
  state: new State(),
};
