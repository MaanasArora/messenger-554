const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(Conversation);
Conversation.belongsToMany(User, { through: "member" });
Message.belongsTo(Conversation);
Message.belongsToMany(User, { through: "reader" });
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
