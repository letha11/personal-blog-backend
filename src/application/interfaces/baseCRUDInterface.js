export default class BaseCRUD {
  notImplemented;

  constructor() {
    this.notImplemented = Promise.reject(new Error("Not Implemented"));
  }

  add() {
    return this.#notImplemented;
  }

  update() {
    return this.#notImplemented;
  }

  delete() {
    return this.#notImplemented;
  }

  getById() {
    return this.#notImplemented;
  }

  getAll() {
    return this.#notImplemented;
  }
};
