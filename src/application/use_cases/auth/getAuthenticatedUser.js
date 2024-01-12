export default async function getAuthenticatedUser(
  id,
  authRepo,
) {
  return authRepo.getAuthenticatedUser(id);
}

