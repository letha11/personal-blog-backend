import findById from "../application/use_cases/post/findById";

export default function postController(postRepository) {
  const getPostById = async (req, res, next) => {
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

  return {
    getPostById,
  };
}
