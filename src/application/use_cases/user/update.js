import userEntity from "../../../entities/userEntity";
import { NotFoundError } from "../exceptions";

export default async function updateUser(
	id,
	username,
	password,
	email,
	userRepo,
	authService
) {
	let user = await userRepo.getByProperty({scope: 'withPassword', where: {id}});
	user = user.dataValues;

	if(!user) throw new NotFoundError('User not found');

	const newUser = userEntity(
		username ?? user.username,
		password ? await authService.encryptPassword(password) : user.password,
		email ?? email,
	);

	return userRepo.update(id, newUser);
}