require("dotenv").config()


module.exports={
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "url":process.env.DB_DEPLOY,
    "dialect":"postgres",
    "host": "0.0.0.0",
    "dialectOptions": {
        "ssl": true,
        "rejectUnauthorized": false
    }
}
}
