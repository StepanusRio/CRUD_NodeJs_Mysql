const sequelize = require("sequelize");

const db = new sequelize("test", "Admin", "5etVi-ZSYBrs5E)2", {
    host: "localhost",
    dialect: "mysql",
});

db.sync({});

module.exports = db;