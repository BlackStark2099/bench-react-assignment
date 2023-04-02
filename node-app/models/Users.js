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
  name: {
    type: Sequelize.STRING,
    unique: {
        args: true,
        msg: 'User ID already in use!'
    },
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
 
  auth_token : {
    type: Sequelize.STRING,
    allowNull:true
  },
  blogs : {
    type: Sequelize.JSON,
    allowNull:true
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

  