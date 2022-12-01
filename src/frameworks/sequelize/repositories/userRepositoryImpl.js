// import UserRepositoryInterface from "../../../application/interfaces/userRepositoryInterface";
import dbModels from "../models/index";

export default function userRepositoryImpl() {
  const User = dbModels["User"];

  const getAll = () => {
    return User.findAll({ include: [{ model: dbModels["Post"], as: "posts" }] });
  };

  return {
    getAll,
  };
}
