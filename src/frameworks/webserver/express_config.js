'use strict'
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// In express you just need to use res.json() to send a JSON response.
// res.json will set Content-Type to application/json and send the JSON string.
const expressConfig = (app, express) => {
  // Middlewares
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());
};

export default expressConfig;