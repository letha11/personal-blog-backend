"use strict";

import fs from "fs";
import path from "path";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const dbModels = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(async (file) => {
		let filePath = path.join(__dirname, file);
		let fileURL = pathToFileURL(filePath);
		
    let model = await import(fileURL);
		model = model.default(sequelize, DataTypes);
		// console.log(model.default(sequelize, DataTypes));

    dbModels[model.name] = model;
  });

Object.keys(dbModels).forEach((modelName) => {
  if (dbModels[modelName].associate) {
    dbModels[modelName].associate(dbModels);
  }
});

dbModels.sequelize = sequelize;

export default dbModels;