export default function deletePost(id, postRepo) {
  return postRepo.delete(id);
}