import dbModels from "../models/index";
import AuthRepositoryInterface from "../../../application/interfaces/authRepositoryInterface";
import { AuthenticationError } from "../../../application/use_cases/exceptions/index";

export default class AuthRepositoryImpl extends AuthRepositoryInterface {
  constructor(userRepo, authServices) {
    super();
    this.User = dbModels.User;
    this.userRepo = userRepo;
    this.authServices = authServices;
  }

  login = async (username, password) => {
    const user = await this.userRepo.getByProperty({
      scope: "withPassword",
      where: {
        username,
      },
    });

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

    const token = await this.authServices.generateToken(username);

    return token
  };
}
