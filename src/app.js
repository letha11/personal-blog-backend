import express from "express";
import dotenv from "dotenv";

import expressConfig from "./frameworks/webserver/express_config";
import initRoutes from "./frameworks/webserver/routes";
import serverConfig from "./frameworks/webserver/server_config";
import config from "./config/config";
import connectDB from "./frameworks/sequelize/connection";
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorHandling";

// Initialize dotenv
dotenv.config()

// Connect to DB
let dbConn = await connectDB();

let app = express();

// Configure express, middleware dll.
expressConfig(app, express);

// Start an server
serverConfig(app, config).startServer(dbConn);

// Initialize express routs
initRoutes(app, express);

// Erorr handling
app.use(errorHandlingMiddleware);

export default app;
