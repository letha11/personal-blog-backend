export default function userEntity(name, username, password, email) {
	// Using getter to prevent all field from being set directly
  return {
    getName: () => name,
    getUsername: () => username,
    getPassword: () => password,
    getEmail: () => email,
  };
}
