import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { readConversation } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  notificationCount: {
    borderRadius: 10,
    padding: "0 7px 0 7px",
    backgroundColor: "#3A8DFF",
    color: "white",
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.id);
    await props.readConversation(
      conversation.otherUser.id, conversation.id, -1
    );
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {conversation.notificationCount > 0 ? (
        <Box className={classes.notificationCount}>
          {conversation.notificationCount}
        </Box>
      ) : null}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readConversation: (otherUserId, conversationId, messageId) => {
      const reqBody = {
        otherUserId: otherUserId,
        conversationId: conversationId,
        messageId: messageId,
      };
      dispatch(readConversation(reqBody));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
