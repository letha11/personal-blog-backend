import BaseCRUD from "./baseCRUDInterface";

export default class TagRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  findById = (id) => this.repository.findById(id);
  findByName = (name) => this.repository.findByName(name);
  findAll = () => this.repository.findAll();
  add = (name) => this.repository.add(name);
  update = (id, name) => this.repository.update(id, name);
  delete = (id) => this.repository.delete(id);
}
