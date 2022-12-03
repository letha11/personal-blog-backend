export default function userEntity(username, password, email) {
	// Using getter to prevent all field from being set directly
  return {
    getUsername: () => username,
    getPassword: () => password,
    getEmail: () => email,
  };
}
