"use strict";
import { Model } from "sequelize";
const Tag = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Post, { through: models.PostTags, as: "posts" });
    }
  }
  Tag.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Tag",
    timestamps: false,
  });

  return Tag;
};

export default Tag;
