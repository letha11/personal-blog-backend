import BaseCRUD from "./baseCRUDInterface";

export default class PostRepositoryInterface extends BaseCRUD {
	constructor(repository) {
		super();
		this.repository = repository;
	}

	getById = (id) => this.repository.getById(id);

}