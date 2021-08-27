import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incrementNotificationCount,
} from "./store/conversations";
import { readMessage } from "./store/utils/thunkCreators";

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
    if (store.getState().activeConversation !== data.sender.username) {
      store.dispatch(incrementNotificationCount(data.sender.id));
    } else {
      const reqBody = { messageId: data.message.messageId };
      store.dispatch(readMessage(reqBody));
    }
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
