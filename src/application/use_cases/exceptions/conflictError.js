export default class ConflictError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConflictError';
		this.statusCode = 409;
	}
}
