import dbModels from "../models/index";

export default function userRepositoryImpl(authService) {
  const User = dbModels["User"];

  const getAll = () => {
    return User.findAll({
      include: [{ model: dbModels["Post"], as: "posts" }],
    });
  };

  const getById = (id) => {
    return User.findByPk(id, {
      include: [{ model: dbModels["Post"], as: "posts" }],
    });
  };

  const getByProperty = async (properties) => {
    let user;

    if (properties.scope) {
      user = await User.scope(properties.scope).findOne({
        where: properties.where,
      });
    } else {
      user = await User.findOne({
        where: properties.where,
      });
    }

    return user;
  };

  const add = async (name, username, email, password) => {
    password = await authService.encryptPassword(password);

    const newUser = await User.create({
      name: name,
      username: username,
      password: password,
      email: email,
    });

    // Deleting password field from the returned object
    delete newUser.dataValues.password;

    return newUser;
  };

  const update = async (id, name, username, email, password, role) => {
    if (password) {
      password = authService.encryptPassword(password);
    }

    const updatedUser = await User.update(
      {
        name: name,
        username: username,
        password: password,
        email: email,
        role: role,
      },
      {
        where: { id },
      },
    );

    return updatedUser;
  };

  const deleteUser = (id) => {
    return dbModels["sequelize"].transaction(async (t) => {
      // Delete all post where have the user id
      await dbModels["Post"].destroy(
        { where: { authorId: id } },
        { transaction: t },
      );
      const result = await User.destroy(
        { where: { id: id } },
        { transaction: t },
      );

      return result;
    });
  };

  return {
    getAll,
    getById,
    getByProperty,
    add,
    update,
    deleteUser,
  };
}
