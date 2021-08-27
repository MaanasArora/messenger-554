import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementNotificationCount,
  setReadMessage,
} from "./store/conversations";
import { readConversation } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    if (store.getState().activeConversation !== data.message.senderId) {
      store.dispatch(incrementNotificationCount(data.message.senderId));
    } else {
      const reqBody = {
        otherUserId: data.message.senderId,
        conversationId: data.message.conversationId,
        messageId: data.message.id,
      };
      store.dispatch(readConversation(reqBody));
    }
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("convo-read", (data) => {
    store.dispatch(setReadMessage(data.conversationId, data.messageId))
  });
});

export default socket;
