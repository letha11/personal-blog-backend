import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 8081,
  ip: process.env.IP || "localhost",
	DB_NAME: process.env.DB_NAME || '',
	DB_USER: process.env.DB_USER || '',
	DB_PASS: process.env.DB_PASS || '',
	DB_HOST: process.env.DB_HOST || '',
	TOKEN_SECRET: process.env.TOKEN_SECRET,
};

export default config;
