export default async function register(name, username, email, password, authRepo) {
  const result = await authRepo.register(name, username, email, password);

  return result;
}
