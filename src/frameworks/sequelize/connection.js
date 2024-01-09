'use strict'

import { Sequelize } from "sequelize";
import config from "../../config/config";
import dotenv from 'dotenv';

dotenv.config()

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "mysql",
  }
);

export default async function checkDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");
    return true;
  } catch (e) {
    console.log("Cannot connect to database");
    console.error(e);
    return false;
  }
}

export { checkDBConnection, sequelize };
