import { NotFoundError } from "../exceptions/index";

export default async function getByProperty(property, userRepo) {
	const user = await userRepo.getByProperty(property)

	if (!user) throw new NotFoundError("User not found");

	return user;
}
