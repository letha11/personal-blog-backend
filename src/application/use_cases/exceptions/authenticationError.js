export default class AuthenticationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = statusCode;
  }
}
