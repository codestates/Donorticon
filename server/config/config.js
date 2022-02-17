const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'donorticon',
    host: "donorticondb.ctt6ztqvzyip.ap-northeast-2.rds.amazonaws.com",
    port: "13306",
    dialect: "mysql"
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'donorticon',
    host: "donorticondb.ctt6ztqvzyip.ap-northeast-2.rds.amazonaws.com",
    port: "13306",
    dialect: "mysql"
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'donorticon',
    host: "donorticondb.ctt6ztqvzyip.ap-northeast-2.rds.amazonaws.com",
    port: "13306",
    dialect: "mysql"
  }
}