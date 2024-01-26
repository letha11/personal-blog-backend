export default async function addTag(name, tagRepo) {
  return tagRepo.add(name)
}
