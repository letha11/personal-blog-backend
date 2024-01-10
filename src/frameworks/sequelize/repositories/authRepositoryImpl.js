import dbModels from "../models/index";
import AuthRepositoryInterface from "../../../application/interfaces/authRepositoryInterface";
import { AuthenticationError } from "../../../application/use_cases/exceptions/index";
import getByProperty from "../../../application/use_cases/user/getByProperty";
import addUser from "../../../application/use_cases/user/add";

export default class AuthRepositoryImpl extends AuthRepositoryInterface {
  constructor(userRepo, authServices) {
    super();
    this.User = dbModels.User;
    this.userRepo = userRepo;
    this.authServices = authServices;
  }

  login = async (username, password) => {
    const user = await getByProperty({
      scope: "withPassword",
      where: {
        username,
      },
    }, this.userRepo);

    const { role } = user;

    const isPasswordMatched = await this.authServices.checkPassword(
      password,
      user.dataValues.password,
    );

    if (!isPasswordMatched) {
      throw new AuthenticationError(
        "Wrong Password! please try again",
        401,
      );
    }

    const token = await this.authServices.generateToken({ username, role });

    return token;
  };

  register = async (name, username, email, password) => {
    const newUser = await addUser(
      name,
      username,
      password,
      email,
      this.userRepo,
      this.authServices,
    );

    const token = await this.authServices.generateToken({ username });

    return { token, newUser };
  };
}
