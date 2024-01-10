import userEntity from "../../../entities/userEntity";
import { ValidationError, ConflictError } from "../exceptions/index";

export default async function addUser(
  name,
  username,
  password,
  email,
  userRepo,
  authService
) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!username || !password || !email || !name) {
    throw new ValidationError(
      "name, username, password and email fields cannot be empty"
    );
  }

  const newUser = userEntity(
    name,
    username,
    await authService.encryptPassword(password),
    email
  );

  // Check username and email if already exists
  const existingUsername = await userRepo.getByProperty({
    where: { username: newUser.getUsername() },
  });
  if (existingUsername) throw new ConflictError("Username already exists");

  const existingEmail = await userRepo.getByProperty({
    where: { email: newUser.getEmail() },
  });
  if (existingEmail) throw new ConflictError("Email already exists");

  return userRepo.add(newUser);
}
