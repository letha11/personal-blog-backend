// import authServiceInterface from "../../../application/interfaces/authServiceInterface";
// import config from "../../../config/config";
// import authServiceImpl from "../../services/authService";

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    if (!req.role) {
      return res.sendStatus(403);
    }

    roles = roles.map((role) => role.toLowerCase())

    if (roles.includes(req.role)) {
      next();
    } else {
      return res.sendStatus(403);
    }
  };
};

export default roleMiddleware;
