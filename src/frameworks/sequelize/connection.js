import { Sequelize } from "sequelize";

export default async function connect() {
  const sequelize = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || root,
    process.env.DB_PASS || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || "3306",
      dialect: "mysql",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");
		return true;
  } catch (e) {
    console.log("Cannot connect to database");
    console.error(e);
		return false;
  }
}
