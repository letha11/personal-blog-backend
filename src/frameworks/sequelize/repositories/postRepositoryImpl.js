import dbModels from "../models/index";

export default class PostRepositoryImpl {
  constructor() {
    this.model = dbModels["Post"];
  }

  findAll = () => {
    return this.model.findAll({
      include: [{ model: dbModels["User"], as: "author" }]
    });
  };

  findById = async (id) => {
    // findByPk stand for = Find by Primary key
    const post = await this.model.findByPk(id, { include: [{ model: dbModels["User"], as: "author" }] });
    return post;
  };

  getByProperty = async (properties) => {
    let post;
    if (properties.scope) {
      post = await this.model.scope(properties.scope).findOne({
        where: properties.where
      });
    } else {
      post = await this.model.findOne({
        where: properties.where
      });
    }

    return post;
  };

  add = async (postEntity) => {
    const newPost = await this.model.create({
      authorId: postEntity.authorId,
      title: postEntity.title,
      body: postEntity.body
    });

    return newPost;
  };

  update = async (id, postEntity) => {
    const result = await this.model.update({
        authorId: postEntity.authorId,
        title: postEntity.title,
        body: postEntity.body
      },
      {
        where: { id }
      });

    return result;
  };

  delete = async (id) => {
    const result = await this.model.destroy({ where: { id } });

    return result;
  };


}
