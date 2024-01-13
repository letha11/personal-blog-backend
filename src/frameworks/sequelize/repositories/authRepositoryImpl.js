import dbModels from "../models/index";
import AuthRepositoryInterface from "../../../application/interfaces/authRepositoryInterface";
import { AuthenticationError } from "../../../application/use_cases/exceptions/index";
import getByProperty from "../../../application/use_cases/user/getByProperty";
import addUser from "../../../application/use_cases/user/add";
import getById from "../../../application/use_cases/user/getById";

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

    const { id, role } = user;

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

    const payload = { id, username, role };
    const refreshToken = await this.authServices.generateToken(payload, {
      expiresIn: "7d",
    });
    const token = await this.authServices.generateToken(payload, {
      expiresIn: "7h",
    });

    return { token, refreshToken };
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

  getAuthenticatedUser = async (id) => {
    const authenticatedUser = await getById(id, this.userRepo);

    return authenticatedUser;
  };

  refreshToken = async (refreshToken) => {
    try{
      const decoded = await this.authServices.verifyToken(refreshToken);

      const renewedRefreshToken = await this.authServices.generateToken(decoded, {
        expiresIn: "7d",
      });

      const renewedToken = await this.authServices.generateToken(decoded, {
        expiresIn: "7h",
      });

      return { renewedToken, renewedRefreshToken };
    } catch(e) {
      throw new AuthenticationError("Invalid Refresh Token", 401);
    }
  };
}
