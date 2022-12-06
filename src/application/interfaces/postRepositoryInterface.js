import BaseCRUD from "./baseCRUDInterface";

export default class PostRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  getById = (id) => this.repository.findById(id);
  getByProperty = (properties) => this.repository.getByProperty(properties);
  getAll = () => this.repository.findAll();
  add = (postEntity) => this.repository.add(postEntity);
  update = (id, postEntity) => this.repository.update(id, postEntity);
  delete = (id) => this.repository.delete(id);

}