import { NotFoundError } from "../exceptions";

export default async function getById(id, userRepo) {
	const user = await userRepo.getById(id)

	// User not found
	if (!user) throw new NotFoundError("User not found");

	return user;
}