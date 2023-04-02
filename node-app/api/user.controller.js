const model = require("../models/Definitions");
const {
  find,
  create,
  update,
  find_all,
  delete_obj,
} = require("./user.service");
const jwt = require("jsonwebtoken");
const { user } = require("../models/Definitions");
const { Op } = require("sequelize");

function createID(req, res) {
  req.body["id"] = Date.now();
  req.body["id"] =
    Math.floor(req.body["id"] / 1000) * 1000 * 1000 + (req.body["id"] % 1000);
}

async function get_user_from_authtoken(body, type) {
  let user = await find(
    body,
    type,
    "auth_token",
    "auth_token",
    async (user, result) => {
      let usertem = await user;
    }
  );
  
  return user;
}

module.exports = {
  login: async (req, res) => {
    const body = req.body;
    const type = req.params.type;
    let token = jwt.sign(body, "qwer1234", {
      expiresIn: "365d",
    });
    let tokenBody = {
      auth_token: token,
    };
    body["auth_token"] = token;
    find(body, type, "name", "name", async (user, result) => {
      const userTemp = await user;
      if (result && userTemp != undefined) {
        if (userTemp["password"] === body["password"]) {
          update(body, type, tokenBody, "name", "name", (err, result) => {
            if (result === "success" && res.headersSent !== true) {
              res.statusCode = 200;
              res.send({
                message: "Success",
                token: token,
              });
            } else if (res.headersSent !== true) {
              res.statusCode = 500;
              res.send({
                message: "Something went wrong in generating the token",
              });
            }
          });
        } else if (userTemp == undefined && res.headersSent !== true) {
          res.statusCode = 400;
          res.send({
            message: "User Doesnot exists",
          });
        } else if (res.headersSent !== true) {
          res.statusCode = 400;
          res.send({
            message: "incorrect password",
          });
        }
      } else {
        createID(req, res);
        create(body, type, (error, result) => {
          if (result === "success" && res.headersSent !== true) {
            console.log("stage 3");
            res.statusCode = 200;
            res.send({
              message: "Success",
              token: token,
            });
          } else if (res.headersSent !== true) {
            res.statusCode = 400;
            res.send({
              message: error,
            });
          }
        });
      }
    });
  },

  logout: async (req, res) => {
    let token = req.get("authorization");
    const type = req.params.type;
    var body = {
      auth_token: token,
    };
    let user = await get_user_from_authtoken(body, type);
    if (user == false) {
      res.statusCode = 500;
      res.send({
        message: "Token not found,please login again",
      });
    } else {
      body["auth_token"] = null;
      update(user, type, body, "name", "name", (err, result) => {
        if (result === "success") {
          res.statusCode = 200;
          res.send({
            message: "Logged Out Successfully",
          });
        } else {
          res.statusCode = 500;
          res.send({
            message: "Something went wrong",
          });
        }
      });
    }
  },

  get_all: (req, res) => {
    const type = req.params.type;
    const condition = {
      where: {
        id: {
          [Op.gt]: 0,
        },
      },
    };
    find_all(type, condition, async (userTemp, result) => {
      if (result && userTemp != undefined && res.headersSent !== true) {
        res.statusCode = 200;
        res.send({
          message: "Success",
          data: userTemp,
        });
      } else if (res.headersSent !== true) {
        res.statusCode = 400;
        res.send({
          message: "Something went wrong",
        });
      }
    });
  },

  create_blog: async (req, res) => {
    let token = req.get("authorization");
    const type = req.params.type;
    let body = {
      auth_token: token,
    };
    let user = await get_user_from_authtoken(body, "user");
    if (user != false) {
      createID(req, res);
      body = req.body;
      body["user_id"] = user["id"];
      create(body, type, (error, result) => {
        if (result === "success" && res.headersSent !== true) {
          res.statusCode = 200;
          res.send({
            message: "Blog created successfully",
          });
        } else if (res.headersSent !== true) {
          res.statusCode = 400;
          res.send({
            message: error,
          });
        }
      });
    } else if (res.headersSent !== true) {
      res.statusCode = 400;
      res.send({
        message: "Something went wrong",
      });
    }
  },

  get_all_users_blog: async (req, res) => {
    let token = req.get("authorization");
    const type = req.params.type;
    let body = {
      auth_token: token,
    };
    let user = await get_user_from_authtoken(body, "user");
    if (user != false) {
      let id = user["id"];
      console.log(id);
      const condition = {
        where: {
          user_id: id,
        },
      };
      find_all(type, condition, async (userTemp, result) => {
        if (result && userTemp != undefined && res.headersSent !== true) {
          res.statusCode = 200;
          res.send({
            message: "Success",
            data: userTemp,
          });
        } else if (res.headersSent !== true) {
          res.statusCode = 400;
          res.send({
            message: "Something went wrong",
          });
        }
      });
    } else if (res.headersSent !== true) {
      res.statusCode = 400;
      res.send({
        message: "Something went wrong",
      });
    }
  },

  update_blog: async (req, res) => {
    let token = req.get("authorization");
    const type = req.params.type;
    let body = {
      auth_token: token,
    };
    let user = await get_user_from_authtoken(body, "user");
    if (user != false) {
      body = req.body;
      update(body, type, body, "id", "id", (obj, result) => {
        if (result === "success" && res.headersSent !== true) {
          res.statusCode = 200;
          res.send({
            message: "blog updated successfully",
          });
        } else if (res.headersSent !== true) {
          res.statusCode = 400;
          res.send({
            message: "unable to update the blog",
          });
        }
      });
    } else if (res.headersSent !== true) {
      res.statusCode = 400;
      res.send({
        message: "Something went wrong",
      });
    }
  },

  delete_blog: async (req, res) => {
    body = req.body;
    const type = req.params.type;
    const condition = {
      where: {
        id: body["id"],
      },
    };

    delete_obj(type, condition, (err, obj, result) => {
      if (result === "success" && res.headersSent !== true) {
        res.statusCode = 200;
        res.send({
          message: "blog deleted successfully",
        });
      } else if (res.headersSent !== true) {
        res.statusCode = 400;
        res.send({
          message: "unable to delete this blog, something went wrong !",
        });
      }
    });
  },
};
