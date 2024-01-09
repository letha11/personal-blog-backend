import { ValidationError } from "../exceptions/index";

export default async function login(
  username,
  password,
  authRepo,
) {
  if (!username || !password) {
    throw new ValidationError(
      "username and password cannot be empty",
    );
  }

  return authRepo.login(username, password);
}

