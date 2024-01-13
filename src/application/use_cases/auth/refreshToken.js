export default async function refreshToken(refreshToken, authRepo) {
  return authRepo.refreshToken(refreshToken); }

