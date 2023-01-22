"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// const process = require('process');
const basename = path.basename(__filename);
const env = "production";
const config = require(__dirname + "/../config/config.js")[env];
const db: any = {};

console.log(config);

let sequelize: any;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env.DB_DEPLOY, config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// sequelize = new Sequelize(process.env.DB_DEPLOY, config);
sequelize = new Sequelize(
   process.env.DB_DEPLOY, {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect:"postgres",
    rejectUnauthorized: false
    // dialectOptions: {
    //     "ssl": true,
    //     "rejectUnauthorized": false
    // }
  
});

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
