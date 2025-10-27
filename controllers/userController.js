/**
 * @file userController.js
 * @description
 * Controller class to handle HTTP requests for user-related actions (signup, login).
 *
 * Responsibilities:
 * 1. Receives HTTP requests and interacts with the userService for business logic.
 * 2. Handles login and signup requests.
 * 3. Sends structured JSON responses with appropriate HTTP status codes.
 * 4. Delegates errors to the global error handler using `next(err)`.
 *
 * @dependencies
 * - userService: Service object that contains signup and login logic.
 *
 * Usage:
 * import UserController from './controllers/userController.js';
 * const userController = new UserController(userService);
 *
 * Example with Router:
 * import createUserRouter from './routes/userRouter.js';
 * app.use('/users', createUserRouter(userController));
 */
export default class UserController {
  /**
   * @param {object} userService - Instance of UserService injected via dependency injection
   */
  constructor(userService) {
    this.userService = userService;
  }

  // -------------------- Login Handler --------------------
  /**
   * Handles POST /users/login
   *
   * Flow:
   * 1. Extracts email and password from req.body.
   * 2. Calls userService.login(email, password).
   * 3. Returns structured JSON response with success status and data.
   * 4. If an error occurs, forwards it to the global error handler using `next(err)`.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);

      res.status(result.statusCode).json({
        message: result.message,
        data: result.data,
        successCode: result.successCode,
      });
    } catch (err) {
      next(err);
    }
  }

  // -------------------- Signup Handler --------------------
  /**
   * Handles POST /users/signup
   *
   * Flow:
   * 1. Extracts email and password from req.body.
   * 2. Calls userService.signup(email, password).
   * 3. Returns structured JSON response with success status and data.
   * 4. If an error occurs, forwards it to the global error handler using `next(err)`.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.signup(email, password);

      res.status(result.statusCode).json({
        message: result.message,
        data: result.data,
        successCode: result.successCode,
      });
    } catch (err) {
      next(err);
    }
  }
}
