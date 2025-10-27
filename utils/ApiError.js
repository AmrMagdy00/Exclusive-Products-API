// utils/ApiError.js
export default class ApiError extends Error {
  constructor({ message, statusCode = 500, errorCode = null, details = null }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;
  }
}
