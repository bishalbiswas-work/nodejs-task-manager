# Task Manager API

An Express.js RESTful API for managing personal tasks with JWT-based user authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone Repository](#clone-repository)
  - [Environment Variables](#environment-variables)
  - [Install Dependencies](#install-dependencies)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
  - [Tasks](#tasks)
    - [Get All Tasks](#get-all-tasks)
    - [Create Task](#create-task)
    - [Get Single Task](#get-single-task)
    - [Update Task](#update-task)
    - [Delete Task](#delete-task)
  - [Error Handling](#error-handling)
  - [Swagger UI](#swagger-ui)
- [Testing](#testing)
  - [Test Setup](#test-setup)
  - [Run Tests](#run-tests)
- [Project Structure](#project-structure)
- [Environment Templates](#environment-templates)
- [License](#license)

---

## Features

- User registration & login with JWT authentication
- Create, read, update, delete (CRUD) operations on personal tasks
- Pagination and filtering by status
- Input validation and centralized error handling
- API documentation via Swagger UI
- Fully covered by Jest & Supertest integration tests

## Tech Stack

- **Node.js** & **Express.js**
- **MySQL** (via `mysql2`)
- **bcrypt** for password hashing
- **jsonwebtoken** & **express-jwt** for authentication
- **express-validator** for payload validation
- **morgan** for request logging
- **Swagger UI** & **swagger-jsdoc** for API docs
- **Jest** & **Supertest** for testing

## Prerequisites

- **Node.js** v18 or newer
- **npm** v8 or newer
- **MySQL** v8 or newer

## Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### Environment Variables

Copy the example env files and configure your database credentials and JWT secret:

```bash
cp .env.development .env
# Edit .env to set:
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=your_mysql_user
# DB_PASSWORD=your_mysql_password
# DB_NAME=tasks_db
# JWT_SECRET=your_jwt_secret
# NODE_ENV=development
# PORT=3000
```

### Install Dependencies

```bash
npm install
```

### Database Setup

1. Create a MySQL database (e.g., `tasks_db`).
2. Execute the schema script to create tables:

```bash
mysql -u $DB_USER -p $DB_NAME < config/schema.sql
```

## Running the Server

- **Development Mode** (auto-restarts on file changes):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

Server will listen on `http://localhost:3000` by default.

## API Documentation

Interactive Swagger UI is available at:

```
GET /api/docs
```

### Authentication

#### Register

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success (201):**
  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```
- **Errors:**
  - `400` Validation errors or email already in use

#### Login

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success (200):** Same response as Register
- **Errors:**
  - `401` Invalid credentials

### Tasks

All `/api/tasks` routes require an `Authorization: Bearer <JWT_TOKEN>` header.

#### Get All Tasks

- **Endpoint:** `GET /api/tasks`
- **Query Parameters (optional):**
  - `page` (integer, default `1`)
  - `limit` (integer, default `20`)
  - `status` (string: `pending`, `in-progress`, `completed`)

- **Success (200):**

  ```json
  {
    "page": 1,
    "limit": 20,
    "tasks": [ /* array of Task objects */ ]
  }
  ```

#### Create Task

- **Endpoint:** `POST /api/tasks`
- **Request Body:**
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "status": "pending",
    "dueDate": "2025-04-20"
  }
  ```
- **Success (201):** Returns created Task object

#### Get Single Task

- **Endpoint:** `GET /api/tasks/{id}`
- **Success (200):** Returns Task object
- **Errors:** `404` if not found

#### Update Task

- **Endpoint:** `PUT /api/tasks/{id}`
- **Request Body (any subset of fields):**
  ```json
  {
    "status": "completed"
  }
  ```
- **Success (200):** Task updated
- **Errors:** `404` if not found

#### Delete Task

- **Endpoint:** `DELETE /api/tasks/{id}`
- **Success (204):** No content
- **Errors:** `404` if not found

## Error Handling

Errors are returned in the format:

```json
{
  "message": "Error description"
}
```

## Swagger UI

Auto-generated docs based on OpenAPI spec are served at `/api/docs`.

## Testing

Automated tests cover authentication and task CRUD flows using Jest & Supertest.

### Test Setup

Set environment for testing and rebuild schema before tests. Configuration in `tests/setup.js` and `tests/teardown.js`.

Ensure `.env.test` is configured, e.g.:

```bash
# .env.test
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=tasks_test_db
JWT_SECRET=test_jwt_secret
NODE_ENV=test
```

### Run Tests

```bash
npm test
```

- **Watch mode:**

  ```bash
  npm run test:watch
  ```

Coverage reports are generated by Jest.

## Project Structure

```
├── config          # Database & migration configs
│   ├── dbConfig.js
│   ├── migrate.js
│   └── schema.sql
├── controllers     # Route handlers
│   ├── authController.js
│   └── taskController.js
├── docs            # Swagger setup
│   ├── swagger.js
│   └── swagger.json
├── middleware      # Auth, validation, error handling
├── models          # ORM / query layer
├── routes          # Express route definitions
├── tests           # Jest & Supertest tests
├── utils           # JWT utilities
├── server.js       # App entry point
├── package.json
└── README.md
```

## Environment Templates

- **.env.development** (copy to `.env` for local dev)
- **.env.test** (used when `NODE_ENV=test`)
