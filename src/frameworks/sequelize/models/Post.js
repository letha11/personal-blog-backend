"use strict";
import { Model } from "sequelize";

const Post = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			console.log(models.User);
      this.belongsTo(models.User, { foreignKey: "authorId", as: "author" });
    }
  }
  Post.init(
    {
      authorId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

export default Post;