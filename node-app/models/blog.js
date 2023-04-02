const db = require("../config/database");
const Sequelize = require('sequelize'); 

const model = {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    validate: {
      len: {
        args: [0,20],
        msg: "Min length of the phone number is 10"
      }
    }
  },
  blog : {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id:{
    type: Sequelize.BIGINT,
    primaryKey: true,
    validate: {
      len: {
        args: [0,20],
        msg: "Min length of the phone number is 10"
      }
    }
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}



module.exports = { model }; 

  