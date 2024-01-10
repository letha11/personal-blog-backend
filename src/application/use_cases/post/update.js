import { NotFoundError } from "../exceptions/index.js";

export default async function updatePost(id, title, body, postRepo) {
  let existingPost = await postRepo.getById(id);
  existingPost = existingPost.dataValues;

  if (!existingPost) throw new NotFoundError("Post not found");

  return postRepo.update(
    id,
    existingPost.authorId,
    title ?? existingPost.title,
    body ?? existingPost.body,
  );
}
