import BaseCRUD from "./baseCRUDInterface";

export default class PostRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  findById = (id) => this.repository.findById(id);
  getByProperty = (properties) => this.repository.getByProperty(properties);
  findAll = () => this.repository.findAll();
  add = (authorId, title, body, tags) =>
    this.repository.add(authorId, title, body, tags);
  update = (id, authorId, title, body, tags) =>
    this.repository.update(id, authorId, title, body, tags);
  delete = (id) => this.repository.delete(id);
}
