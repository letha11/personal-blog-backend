import dbModels from "../models/index";

export default function userRepositoryImpl() {
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

  const add = async (userEntity) => {
    const newUser = await User.create({
      username: userEntity.getUsername(),
      password: userEntity.getPassword(),
      email: userEntity.getEmail(),
    });

    // Deleting password field from the returned object
    delete newUser.dataValues.password;

    return newUser;
  };

  const update = async (id, userEntity) => {
    const result = await User.update(
      {
        username: userEntity.getUsername(),
        password: userEntity.getPassword(),
        email: userEntity.getEmail(),
      },
      {
        where: { id },
      },
    );

    return result;
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
