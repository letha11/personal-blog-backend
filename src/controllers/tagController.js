import addTag from "../application/use_cases/tag/add";
import deleteTag from "../application/use_cases/tag/delete";
import tagFindAll from "../application/use_cases/tag/findAll";
import tagFindById from "../application/use_cases/tag/findById";
import updateTag from "../application/use_cases/tag/update";

export default function tagController(tagRepository) {
  const getById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const post = await tagFindById(id, tagRepository);
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
      const posts = await tagFindAll(tagRepository);

      res.json({
        success: true,
        data: posts,
      });
    } catch (e) {
      next(e);
    }
  };

  const add = async (req, res, next) => {
    const { name } = req.body;

    try {
      const newUser = await addTag(name, tagRepository);

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
    const { name } = req.body;

    try {
      await updateTag(id, name, tagRepository);

      res.json({
        success: true,
        message: "Tag updated successfully",
      });
    } catch (e) {
      next(e);
    }
  };

  const del = async (req, res, next) => {
    const { id } = req.params;

    try {
      await deleteTag(id, tagRepository);

      res.json({
        success: true,
        message: "Tag deleted successfully",
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
