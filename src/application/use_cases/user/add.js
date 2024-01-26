import { ConflictError, ValidationError } from "../exceptions/index";

export default async function addUser(
  name,
  username,
  password,
  email,
  userRepo,
) {
  return userRepo.add(name, username, email, password, userRepo);
}
