import { NotFoundError } from "../exceptions/index.js";

export default async function findById(id, postRepo) {
  const post = await postRepo.findById(id);

  if (!post) throw new NotFoundError("Post not found");

  return post;
}
