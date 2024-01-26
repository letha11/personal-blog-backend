import TagRepositoryInterface from "../../../application/interfaces/tagRepositoryInterface";
import dbModels from "../models/index";

export default class TagRepositoryImpl extends TagRepositoryInterface {
  constructor() {
    super();
    this.model = dbModels["Tag"];
    this.associatedModel = dbModels["Post"];
  }

  findAll = () => {
    return this.model.findAll();
  };

  findById = async (id) => {
    const tag = await this.model.findByPk(id, {
      include: [{
        model: this.associatedModel,
        through: {
          attributes: [],
        },
        as: "posts",
      }],
    });
    return tag;
  };

  findByName = async (name) => {
    let tag = await this.model.findOne({
      where: {
        "name": name,
      },
    });

    return tag;
  };

  add = async (name) => {
    const newTag = await this.model.create({
      name: name,
    });

    return newTag;
  };

  update = async (id, name) => {
    const result = await this.model.update({
      name: name,
    }, {
      where: { id },
    });

    return result;
  };

  delete = async (id) => {
    const result = await this.model.destroy({ where: { id } });

    return result;
  };
}
