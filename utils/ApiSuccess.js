export default class ApiSuccess {
  constructor({ message, statusCode = 200, data = null, successCode = null }) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.successCode = successCode;
    this.isSuccess = true;
  }
}
