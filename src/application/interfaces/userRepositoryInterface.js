import BaseCRUD from "./baseCRUDInterface";

export default class UserRepositoryInterface extends BaseCRUD {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  getAll = () => this.repository.getAll();
  getByName() {
    return Promise.reject(new Error("Not Implemented"));
  }
}
