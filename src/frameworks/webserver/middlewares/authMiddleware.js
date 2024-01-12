import authServiceInterface from "../../../application/interfaces/authServiceInterface";
import config from "../../../config/config";
import authServiceImpl from "../../services/authService";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const authService = authServiceInterface(authServiceImpl(config))

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = await authService.verifyToken(token);
    
    req.id = decoded.id;
    req.username = decoded.username;
    req.role = decoded.role;

    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
