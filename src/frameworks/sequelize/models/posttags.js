"use strict";
import { Model } from "sequelize";
import Post from "./Post";
import Tag from "./Tag";

export default (sequelize, DataTypes) => {
  class PostTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostTags.init({
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id",
      },
    },
    TagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: "PostTags",
  });
  return PostTags;
};
