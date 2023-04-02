const pool = require("../../node-app/config/database");
const model = require("../models/Definitions");
const { Op } = require("sequelize");

module.exports = {
  create: (body, type, callback) => {
    let def = model[type];
    def
      .create(body)
      .then((res) => {
        callback(null, "success");
      })
      .catch((err) => {
        let error = "";
        try {
          error = err["errors"][0]["message"];
        } catch {
          error = err;
        }
        callback(error, "fail");
      });
  },

  find: (body, type, findType, varName, callback) => {
    let def = model[type];
    var obj = def
      .findOne({
        where: {
          [varName]: body[findType],
        },
      })
      .then((obj) => {
        if (obj) {
          user = obj;
          callback(user, true);
          return user;
        } else {
          user = false;
          callback(user, false);
          return false;
        }
      });
    return obj;
  },

  update: (body, type, updatedInfo, updateType, varName, callback) => {
    const def = model[type];
    def
      .update(updatedInfo, {
        where: {
          [varName]: body[updateType],
        },
      })
      .then((obj) => {
        callback(obj, "success");
      })
      .catch((err) => {
        callback(err, "fail");
      });
  },

  find_all: (type, condition, callback) => {
    let def = model[type];
    var obj = def.findAll(condition).then((user) => {
      console.log(user);
      if (user) {
        callback(user, true);
      } else {
        callback(undefined, false);
      }
    });
  },

  delete_obj: (type, condition, callback) => {
    let def = model[type];
    const obj = def
      .destroy(condition)
      .then((obj) => {
        if (obj) {
          console.log(obj);
          callback(null, obj, "success");
        } else {
          callback(err, null, "fail");
        }
      })
      .catch((err) => {
        callback(err, null, "fail");
      });
    if (obj) {
    } else {
      callback(err, null, "fail");
    }
  },
};
