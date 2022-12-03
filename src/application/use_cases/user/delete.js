export default function deleteUserUsecase(id, userRepo) {
	return userRepo.delete(id);
}