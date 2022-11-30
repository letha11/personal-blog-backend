import getAllUser from "../application/use_cases/user/getAll";
import addUser from "../application/use_cases/user/add";

export default function userController(
	userRepository,
) {
	const userRepo = userRepository;

	const getAll = async (req, res, next) => {
		let users = await getAllUser(userRepo);
		res.json({"message": "success"});
	}

	const add = async (req, res, next) => {
		try {
			let test = await addUser(userRepo);
			res.json({"message": "add"});
		} catch(e) {
			next(e);
		}
	}

	return {
		getAll,
		add,
	}
}