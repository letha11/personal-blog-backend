import postEntity from "../../../entities/postEntity.js";
import { ValidationError } from "../exceptions/index.js";

export default function addPost(
  authorId,
  title,
  body,
  postRepo
) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!authorId || !title || !body) {
    throw new ValidationError(
      "authorId, title and body fields cannot be empty"
    );
  }

  const newPost = postEntity(authorId, title, body);

  return postRepo.add(newPost);
}