"use strict";

import express from "express";

import expressConfig from "./frameworks/webserver/express_config";
import initRoutes from "./frameworks/webserver/routes/index";
import serverConfig from "./frameworks/webserver/server_config";
import config from "./config/config";
import { checkDBConnection } from "./frameworks/sequelize/connection";
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorHandling";

// Connect to DB
let dbConn = await checkDBConnection();

let app = express();

// Configure express, middleware dll.
expressConfig(app, express);

// Start an server
serverConfig(app, config).startServer(dbConn);

// Initialize express routs
initRoutes(app, express);

// Error handling
app.use(errorHandlingMiddleware);

export default app;
