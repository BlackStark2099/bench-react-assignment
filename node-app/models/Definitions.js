const db = require('../config/database');
const userModel = require('./Users');
const blogModel = require("./blog");

const userSQLDef = db.squel.define(
    'users',
    userModel.model,
    {
        tableName : "User",
        timestamps : false
    }
);

const blogSQLDef = db.squel.define(
    'blogs',
    blogModel.model,
    {
        tableName : "blog",
        timestamps : false
    }
);


const modelDef = {
    "user" : userSQLDef,
    "blog" : blogSQLDef
}
module.exports = modelDef;