const DATABASE_NAME = process.env.DB_NAME;
const USERNAME =  process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const HOST =  process.env.DB_HOST;
const DIALECT =  process.env.DB_DIALECT;

module.exports = {
    HOST: HOST,
    USER: USERNAME,
    PASSWORD: PASSWORD,
    DB: DATABASE_NAME,
    dialect: DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };