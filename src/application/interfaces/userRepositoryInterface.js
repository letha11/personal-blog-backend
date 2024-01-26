import BaseCRUD from "./baseCRUDInterface";

export default class UserRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  findAll = () => this.repository.getAll();

	findById = (id) => this.repository.getById(id);

	getByProperty = (properties) => this.repository.getByProperty(properties);

  add = (name, username, email, password) => this.repository.add(name, username, email, password);

  update = (id, name, username, email, password, role) => this.repository.update(id, name, username, email, password, role);

  delete = (id) => this.repository.deleteUser(id);

}
