import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  incrementNotificationCountInStore,
  decrementNotificationCountInStore,
  clearNotificationCountInStore,
  setLatestReadMessageInStore,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const INCREMENT_NOTIFICATION_COUNT = "INCREMENT_NOTIFICATION_COUNT";
const DECREMENT_NOTIFICATION_COUNT = "DECREMENT_NOTIFICATION_COUNT";
const CLEAR_NOTIFICATION_COUNT = "CLEAR_NOTIFICATION_COUNT";
const SET_READ_MESSAGE = "SET_READ_MESSAGE";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const incrementNotificationCount = (otherUserId) => {
  return {
    type: INCREMENT_NOTIFICATION_COUNT,
    otherUserId,
  };
};

export const decrementNotificationCount = (otherUserId) => {
  return {
    type: DECREMENT_NOTIFICATION_COUNT,
    otherUserId,
  };
};

export const clearNotificationCount = (otherUserId) => {
  return {
    type: CLEAR_NOTIFICATION_COUNT,
    otherUserId,
  };
};

export const setReadMessage = (conversationId, messageId) => {
  return {
    type: SET_READ_MESSAGE,
    payload: { conversationId, messageId },
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case INCREMENT_NOTIFICATION_COUNT:
      return incrementNotificationCountInStore(state, action.otherUserId);
    case DECREMENT_NOTIFICATION_COUNT:
      return decrementNotificationCountInStore(state, action.otherUserId);
    case CLEAR_NOTIFICATION_COUNT:
      return clearNotificationCountInStore(state, action.otherUserId);
    case SET_READ_MESSAGE:
      return setLatestReadMessageInStore(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
