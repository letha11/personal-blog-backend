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
      "title and body fields cannot be empty"
    );
  }

  return postRepo.add(authorId, title, body);
}
