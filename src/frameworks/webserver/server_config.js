const serverConfig = (app, config) => {
  // do some configuration later

  const startServer = () => {
    app.listen(config.port, config.ip, () => {
      console.log(`Server started at ${config.ip}:${config.port}`);
    });
  };

  return {
    startServer,
  };
};

export default serverConfig;