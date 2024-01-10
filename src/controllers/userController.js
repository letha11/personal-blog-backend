import getAllUser from "../application/use_cases/user/getAll";
import addUser from "../application/use_cases/user/add";
import getById from "../application/use_cases/user/getById";
import deleteUserUsecase from "../application/use_cases/user/delete";
import updateUser from "../application/use_cases/user/update";

export default function userController(userRepository) {
  const userRepo = userRepository;

  const getAll = async (req, res, next) => {
    try {
      let users = await getAllUser(userRepo);

      res.json({ status: true, data: users });
    } catch (e) {
      next(e);
    }
  };

  const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await getById(id, userRepo);

      res.json({ status: true, data: user });
    } catch (e) {
      next(e);
    }
  };

  const addNewUser = async (req, res, next) => {
    const { name, username, password, email } = req.body;

    try {
      const newUser = await addUser(
        name,
        username,
        password,
        email,
        userRepo,
      );

      res.json({ status: true, data: newUser });
    } catch (e) {
      next(e);
    }
  };

  const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await deleteUserUsecase(id, userRepo);

      res.json({
        status: true,
        message: "success",
        data: "User deleted successfully",
      });
    } catch (e) {
      next(e);
    }
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, username, password, email, role } = req.body;

    try {
      await updateUser(id, name, username, password, email, role, userRepo);

      res
        .status(200)
        .json({ status: true, message: "User updated successfully" });
    } catch (e) {
      next(e);
    }
  };

  return {
    getAll,
    addNewUser,
    getUserById,
    deleteUser,
    update,
  };
}
