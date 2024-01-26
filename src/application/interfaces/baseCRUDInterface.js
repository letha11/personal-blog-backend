export default class BaseCRUD {
  constructor() {}

  add() {
    return Promise.reject(new Error("Not Implemented"));
  }

  update() {
    return Promise.reject(new Error("Not Implemented"));
  }

  delete() {
    return Promise.reject(new Error("Not Implemented"));
  }

  findById() {
    return Promise.reject(new Error("Not Implemented"));
  }

  findAll() {
    return Promise.reject(new Error("Not Implemented"));
  }
}
