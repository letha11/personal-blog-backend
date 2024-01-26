import dbModels from "../models/index";

export default class PostRepositoryImpl {
  constructor() {
    this.model = dbModels["Post"];
  }

  findAll = () => {
    return this.model.findAll({
      include: [
        {
          attributes: ["id", "name", "email", "username"],
          model: dbModels["User"],
          as: "author",
        },
        {
          attributes: ["id", "name"],
          model: dbModels["Tag"],
          through: { attributes: [] },
          as: "tags",
        },
      ],
    });
  };

  findById = async (id) => {
    // findByPk stand for = Find by Primary key
    const post = await this.model.findByPk(id, {
      include: [
        { model: dbModels["User"], as: "author" },
        {
          model: dbModels["Tag"],
          through: { attributes: [] },
          as: "tags",
        },
      ],
    });
    return post;
  };

  getByProperty = async (properties) => {
    let post;
    if (properties.scope) {
      post = await this.model.scope(properties.scope).findOne({
        where: properties.where,
      });
    } else {
      post = await this.model.findOne({
        where: properties.where,
      });
    }

    return post;
  };

  add = async (authorId, title, body, tags) => {
    const newPost = await this.model.create({
      authorId: authorId,
      title: title,
      body: body,
    }, {
      include: {
        attributes: ["id", "name"],
        model: dbModels["Tag"],
        through: { attributes: [] },
        as: "tags",
      },
    });

    // for (const tag of tags.split(",")) {
    //   await newPost.addTag(tag);
    // }

    await newPost.addTags(tags.split(","));

    await newPost.reload(); // reload to get the new added tag

    return newPost;
  };

  update = async (id, authorId, title, body, tags) => {
    const updatedModel = await this.model.update({
      authorId: authorId,
      title: title,
      body: body,
    }, {
      where: { id },
    });

    let test = await this.findById(id);

    test.setTags(tags.split(","));

    return updatedModel;
  };

  delete = async (id) => {
    const result = await this.model.destroy({ where: { id } });

    return result;
  };
}
