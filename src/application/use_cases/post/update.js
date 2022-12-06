import { NotFoundError } from "../exceptions/index.js";
import postEntity from "../../../entities/postEntity.js";

export default async function updatePost(id, title, body, postRepo) {
  let existingPost = await postRepo.getById(id);
  existingPost = existingPost.dataValues;

  if (!existingPost) throw new NotFoundError("Post not found");

  const newPost = postEntity(
    existingPost.authorId,
    title ?? existingPost.title,
    body ?? existingPost.body,
  )

  return postRepo.update(id, newPost);
}