const router = require("express").Router();
const {
  login,
  logout,
  get_all,
  create_blog,
  get_all_users_blog,
  update_blog,
  delete_blog
} = require("./user.controller");
const { checkToken } = require("../authorization/authorization");

router.post("/login/:type", login);
router.get("/logout/:type", logout);
router.get("/get_all/:type", get_all);
router.get("/create_blog/:type", checkToken, create_blog);
router.get("/get_all_users_blog/:type", checkToken, get_all_users_blog);
router.post("/update_blog/:type", checkToken, update_blog);
router.post("/delete_blog/:type", checkToken, delete_blog);


// router.post("/create/:type",checkToken,create_blog);

module.exports = router;
