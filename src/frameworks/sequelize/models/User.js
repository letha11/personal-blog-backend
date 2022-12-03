"use strict";
import { Model } from "sequelize";

const User = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "authorId", as: "posts" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withPassword: {
					attributes: {}, // this will include all attributes
				}
			}
    }
  );
  return User;
};

export default User;
