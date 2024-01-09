import authServiceInterface from "../../../application/interfaces/authServiceInterface";
import config from "../../../config/config";
import authServiceImpl from "../../services/authService";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const authService = authServiceInterface(authServiceImpl(config))

  if (!token) {
    return res.status(401).json({ status: false, message: "Access Denied" });
  }

  try {
    const decoded = await authService.verifyToken(token);
    
    req.username = decoded.username;

    next();
  } catch (e) {
    return res.status(401).json({ status: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
