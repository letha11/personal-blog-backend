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
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
      scopes: {
        all: {
          attributes: {},
        },
        withPassword: {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }, // this will include all attributes
        },
        creationTime: {
          attributes: {
            exclude: ["password"],
          },
        },
      },
    },
  );

  return User;
};

export default User;
