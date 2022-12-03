import BaseCRUD from "./baseCRUDInterface";

export default class UserRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  getAll = () => this.repository.getAll();

	getById = (id) => this.repository.getById(id);

	getByProperty = (properties) => this.repository.getByProperty(properties);

  add = (user) => this.repository.add(user);

  update = (id, user) => this.repository.update(id, user);

  delete = (id) => this.repository.deleteUser(id);

}
