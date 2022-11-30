'use strict'

import { Sequelize } from "sequelize";
import config from "../../config/config";
import dotenv from 'dotenv';

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
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
