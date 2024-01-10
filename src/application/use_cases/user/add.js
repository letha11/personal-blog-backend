import { ConflictError, ValidationError } from "../exceptions/index";

export default async function addUser(
  name,
  username,
  password,
  email,
  userRepo,
) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!username || !password || !email || !name) {
    throw new ValidationError(
      "name, username, password and email fields cannot be empty",
    );
  }

  // Check username and email if already exists
  const existingUsername = await userRepo.getByProperty({
    where: { username: username },
  });
  if (existingUsername) throw new ConflictError("Username already exists");

  const existingEmail = await userRepo.getByProperty({
    where: { email: email },
  });
  console.log(existingEmail);
  if (existingEmail) throw new ConflictError("Email already exists");

  return userRepo.add(name, username, email, password, userRepo);
}
