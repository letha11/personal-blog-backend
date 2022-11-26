const serverConfig = (app, config) => {
  // do some configuration later

  const startServer = (dbConn) => {
		if(dbConn) {
			app.listen(config.port, config.ip, () => {
				console.log(`Server started at ${config.ip}:${config.port}`);
			});
		} else {
			console.log('Cannot start an server, something wrong with the database connection');
		}
  };

  return {
    startServer,
  };
};

export default serverConfig;
