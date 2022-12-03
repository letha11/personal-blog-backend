import userEntity from "../../../entities/userEntity";
import { ValidationError, ConflictError } from "../exceptions";

export default async function addUser(
  username,
  password,
  email,
  userRepo,
  authService
) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!username || !password || !email) {
    throw new ValidationError(
      "username, password and email fields cannot be empty"
    );
  }

  const newUser = userEntity(
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
