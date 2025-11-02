# 🛍️ Exclusive Server

A robust and scalable RESTful API server built with Node.js and Express.js for an e-commerce platform. This server handles product management and user authentication with a clean architecture following best practices.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Logging](#-logging)
- [Error Handling](#-error-handling)

---

## ✨ Features

- 🔐 **User Authentication**: Secure signup and login with password hashing
- 📦 **Product Management**: Get all products with filtering, sorting, and pagination
- 🎨 **Product Variants**: Support for multiple colors and images per product
- 📊 **Structured Logging**: Daily rotating log files using Winston
- 🏗️ **Clean Architecture**: Repository, Service, and Controller layers for maintainability
- 🛡️ **Error Handling**: Centralized error handling with custom error classes
- 🧪 **Testing**: Jest configured for unit and integration tests
- 🔄 **CORS Enabled**: Cross-origin resource sharing for frontend integration

---

## 🏗️ Architecture

This project follows a **layered architecture** pattern:

```
Request → Routes → Controllers → Services → Repositories → Database
```

### Layer Responsibilities:

- **Routes**: Define API endpoints and HTTP methods
- **Controllers**: Handle HTTP requests/responses, validate input
- **Services**: Contain business logic and orchestration
- **Repositories**: Handle database operations (CRUD)
- **Models**: Define data schemas and validation rules

This separation ensures:
- ✅ Easy testing and mocking
- ✅ Code reusability
- ✅ Clear separation of concerns
- ✅ Maintainability and scalability

---

## 🛠️ Tech Stack

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^8.19.1 | MongoDB ODM |
| `bcrypt` | ^6.0.0 | Password hashing |
| `cors` | ^2.8.5 | Cross-origin resource sharing |
| `winston` | ^3.18.3 | Logging library |
| `winston-daily-rotate-file` | ^5.0.0 | Daily log file rotation |
| `validator` | ^13.15.15 | Input validation |
| `dotenv` | ^17.2.3 | Environment variables |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `nodemon` | ^3.1.10 | Auto-restart on file changes |
| `jest` | ^30.2.0 | Testing framework |
| `supertest` | ^7.1.4 | HTTP assertion library |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Exclusive-Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

1. **Create a `.env` file** in the root directory:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/exclusive-db
   ```

   For MongoDB Atlas:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/exclusive-db?retryWrites=true&w=majority
   ```

2. **Customize environment variables** as needed for your setup.

### Running the Server

**Development mode** (with auto-reload):
```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in `.env`).

---

## 📡 API Endpoints

### User Endpoints

#### Register a New User
```http
POST /users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "userId": "...",
    "email": "user@example.com"
  }
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "...",
    "email": "user@example.com"
  }
}
```

### Product Endpoints

#### Get All Products
```http
GET /products?page=1&limit=10&sort=price&category=electronics
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (e.g., `price`, `-price` for descending)
- `category`: Filter by category
- `subCategory`: Filter by sub-category
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `isFeatured`: Filter featured products (true/false)
- `isFlash`: Filter flash sale products (true/false)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

#### Get Product by ID
```http
GET /products/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Product Name",
    "price": 99.99,
    "discountPrice": 79.99,
    "ratingCount": 150,
    "avgRate": 4.5,
    "mainImgSRC": "https://...",
    "description": "Product description...",
    "category": "electronics",
    "subCategory": "phones",
    "colors": [
      {
        "color": "red",
        "images": ["url1", "url2"],
        "quantity": 10
      }
    ]
  }
}
```

---

## 📁 Project Structure

```
Exclusive-Server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── productController.js  # Product request handlers
│   └── userController.js     # User request handlers
├── middleware/
│   └── logger/
│       └── logger.js         # Winston logger configuration
├── models/
│   ├── User.js              # User schema and model
│   └── product.js           # Product schema and model
├── Repositories/
│   ├── productRepository.js # Product database operations
│   └── userRepository.js    # User database operations
├── routes/
│   ├── productRouter.js     # Product route definitions
│   └── userRouter.js        # User route definitions
├── services/
│   ├── productService.js    # Product business logic
│   └── userService.js       # User business logic
├── tests/
│   └── buildQueryOptions.test.js  # Test files
├── utils/
│   ├── ApiError.js          # Custom error class
│   ├── ApiSuccess.js        # Success response helper
│   └── builder.js           # Query builder utilities
├── logs/                    # Generated log files (not committed)
├── app.js                   # Express app configuration
├── server.js                # Application entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

---

## 🧪 Testing

Run tests with:
```bash
npm test
```

The project uses **Jest** for testing with ES modules support. Tests are located in the `tests/` directory.

---

## 📝 Logging

The application uses **Winston** for structured logging:

- **Console Logging**: All logs are printed to console
- **File Logging**: Logs are saved to daily rotating files in `logs/`
  - Combined logs: `YYYY-MM-DD-combined.log`
  - Error logs: `error.log`

**Log Levels:**
- `info`: General information (requests, server events)
- `error`: Error messages and exceptions

---

## ⚠️ Error Handling

The server implements a centralized error handling system:

1. **Operational Errors**: Expected errors with status codes and messages
   ```json
   {
     "success": false,
     "message": "Error message",
     "errorCode": "ERROR_CODE",
     "details": {...}
   }
   ```

2. **Programmatic Errors**: Unexpected errors return generic 500 response
   ```json
   {
     "success": false,
     "message": "Something went wrong! Please check logs.",
     "errorCode": "INTERNAL_SERVER_ERROR"
   }
   ```

---

## 📄 License

ISC

---

## 👥 Author

Built with ❤️ for the Exclusive e-commerce platform.

---

**Happy Coding! 🚀**
