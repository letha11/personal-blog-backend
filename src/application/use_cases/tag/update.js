export default async function updateTag(id, name, tagRepo) {
  return tagRepo.update(id, name)
}
