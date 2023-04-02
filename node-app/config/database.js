// const { createPool } = require('mysql');
// const pool = createPool({
//     port : 3306,
//     host : "localhost",
//     user : "root",
//     password : "muskan@88411251",
//     database : "blog_app",
//     connectionLimit : 10
// });


const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    'blog_app',
    'root',
    'muskan@88411251',
    {
        host :"localhost",
        dialect : 'mysql',

        pool : {
            max : 10,
            min : 0,
            idle : 30
        }
    })
sequelize.authenticate().then(() =>{
    console.log("connected");
}).catch(err => { 
    console.log("Error while connecting database : " + err);
});

const db  = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync();

module.exports.squel = sequelize;
module.exports.db = db;