export default async function tagFindByName(name, tagRepo) {
  return tagRepo.findByName(name)
}
