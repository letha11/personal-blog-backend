export default async function deleteTag(id, tagRepo) {
  return tagRepo.delete(id)
}
