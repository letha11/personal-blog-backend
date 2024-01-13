export default class AuthRepositoryInterface {
  login = (username, password) => Promise.reject(new Error("Not Implemented"));
  register = (name, username, email, password) =>
    Promise.reject(new Error("Not Implemented"));
  getAuthenticatedUser = (id) => Promise.reject(new Error("Not Implemented"));
  refreshToken = (token) => Promise.reject(new Error("Not Implemented"));
}
