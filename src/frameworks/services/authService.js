import bcrypt from 'bcrypt';

export default function authService () {
	const encryptPassword = async (pass) => {
		const hashedPass = await bcrypt.hash(pass, 10);
		return hashedPass;
	}

	return {
		encryptPassword,
	}
}