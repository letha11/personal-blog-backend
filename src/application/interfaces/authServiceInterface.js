export default function authServiceInterface(serviceImpl) {
	const encryptPassword = async (pass) => await serviceImpl.encryptPassword(pass);

	return {
		encryptPassword,
	}
}