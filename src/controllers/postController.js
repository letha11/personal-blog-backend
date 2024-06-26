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

  const findAll = async (_, res, next) => {
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
    const { title, body, tags } = req.body;
    const authorId = req.id;

    try {
      const newPost = await addPost(
        authorId,
        title,
        body,
        tags,
        postRepository,
      );

      res.json({
        success: true,
        data: newPost,
      });
    } catch (e) {
      next(e);
    }
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    const { title, body, tags } = req.body;

    try {
      await updatePost(id, title, body, tags, postRepository);

      res.json({
        success: true,
        message: "Post updated successfully",
      });
    } catch (e) {
      next(e);
    }
  };

  const del = async (req, res, next) => {
    const { id } = req.params;

    try {
      await deletePost(id, postRepository);

      res.json({
        success: true,
        message: "Post deleted successfully",
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
