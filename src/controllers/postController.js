import findById from "../application/use_cases/post/findById";
import getAll from "../application/use_cases/post/getAll";
import addPost from "../application/use_cases/post/add.js";
import updatePost from "../application/use_cases/post/update.js";
import deletePost from "../application/use_cases/post/delete.js";

export default function postController(postRepository) {
  const getById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const post = await findById(id, postRepository);
      res.json({
        success: true,
        data: post,
      });
    } catch (e) {
      next(e);
    }
  };

  const findAll = async (req, res, next) => {
    try {
      const posts = await getAll(postRepository);

      res.json({
        success: true,
        data: posts,
      });
    } catch (e) {
      next(e);
    }
  };

  const add = async (req, res, next) => {
    const { title, body } = req.body;
    const authorId = req.id;

    try {
      const newUser = await addPost(authorId, title, body, postRepository);

      res.json({
        success: true,
        data: newUser,
      });
    } catch (e) {
      next(e);
    }
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    const { title, body } = req.body;

    try {
      const result = await updatePost(id, title, body, postRepository);

      res.json({
        success: true,
        message: "User updated successfully",
      });
    } catch (e) {
      next(e);
    }
  };

  const del = async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await deletePost(id, postRepository);

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (e) {
      next(e);
    }
  };

  return {
    getById,
    findAll,
    add,
    update,
    del,
  };
}
