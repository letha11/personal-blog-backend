import { NotFoundError } from "../exceptions/index";

export default async function updateUser(
  id,
  name,
  username,
  password,
  email,
  role,
  userRepo,
) {
  let user = await userRepo.getByProperty({
    scope: "withPassword",
    where: { id },
  });
  user = user.dataValues;

  if (!user) throw new NotFoundError("User not found");

  return userRepo.update(id, name, username, password, email, role);
}
