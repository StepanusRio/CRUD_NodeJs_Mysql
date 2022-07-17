const Sequelize  = require("sequelize");

const db = require ("../config/Db.js");

const User = db.define("User",{
    username:{type:Sequelize.STRING},
    password:{type:Sequelize.STRING},
    name:{type:Sequelize.STRING},
},{
    freezeTableName:true,
}
);

module.exports = User;