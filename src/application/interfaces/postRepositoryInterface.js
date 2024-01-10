import BaseCRUD from "./baseCRUDInterface";

export default class PostRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  getById = (id) => this.repository.findById(id);
  getByProperty = (properties) => this.repository.getByProperty(properties);
  getAll = () => this.repository.findAll();
  add = (authorId, title, body) => this.repository.add(authorId, title, body);
  update = (id, authorId, title, body) => this.repository.update(id, authorId, title, body);
  delete = (id) => this.repository.delete(id);

}
