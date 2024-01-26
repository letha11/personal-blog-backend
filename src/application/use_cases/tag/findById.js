export default async function tagFindById(id, tagRepo) {
  return tagRepo.findById(id)
}
