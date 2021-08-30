const Sequelize = require("sequelize");
const db = require("../db");

const Recipient = db.define("reader", {
  messageRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Recipient;
