import express from "express";
import expressConfig from "./frameworks/webserver/express_config";
import initRoutes from "./frameworks/webserver/routes";
import serverConfig from "./frameworks/webserver/server_config";
import config from "./config/config";

let app = express();

expressConfig(app, express);

initRoutes(app, express);

serverConfig(app, config).startServer();

export default app;
