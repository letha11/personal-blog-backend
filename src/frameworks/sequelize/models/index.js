"use strict";

import fs from "fs";
import path from "path";
import { sequelize } from "../connection";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const dbModels = {};

(async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );

  await Promise.all(
    files.map(async (file) => {
      let filePath = path.join(__dirname, file);
      let fileURL = pathToFileURL(filePath);
      const module = await import(fileURL);
      const model = module.default(sequelize, Sequelize);
      dbModels[model.name] = model;
    })
  );

  Object.keys(dbModels).forEach((modelName) => {
    if (dbModels[modelName].associate) {
      dbModels[modelName].associate(dbModels);
    }
  });
})();

dbModels.Sequelize = Sequelize; // for accessing static props and functions like Op.or
dbModels.sequelize = sequelize; // for accessing connection props and functions like 'query' or 'transaction'

export default dbModels;
