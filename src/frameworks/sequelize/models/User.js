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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 3,
          max: 16,
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
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
