import dbModels from "../models";

export default class PostRepositoryImpl {
  constructor() {
    this.model = dbModels["Post"];
  }

  getById = async (id) => {
		// findByPk stand for = Find by Primary key
    const post = await this.model.findByPk(id, {include: [{model: dbModels['User'], as: 'author'}]});
		return post;
  };
}
