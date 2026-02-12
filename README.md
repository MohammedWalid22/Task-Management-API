# Task-Management-API

# 🛡️ Secure Task Management API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Security](https://img.shields.io/badge/Security-Hardened-red?style=for-the-badge)

A robust, enterprise-grade RESTful API designed for task management. Built with **Node.js**, **Express**, and **PostgreSQL**, this project focuses heavily on **security best practices**, **clean architecture (MVC)**, and **high-performance database interactions**.

## 🚀 Key Features

### 🔐 Authentication & Authorization
-   **JWT Implementation:** Secure stateless authentication using JSON Web Tokens.
-   **Password Hashing:** Utilizing **Bcrypt** for strong password encryption.
-   **Advanced Middleware:** Checks for token validity, user existence, account status (Active/Suspended), and password change timestamps.

### 🗄️ Database & Performance
-   **PostgreSQL Native Driver (`pg`):** Utilizes **Raw SQL Queries** for maximum performance and control over database interactions.
-   **Data Isolation:** Strict Foreign Key relationships ensure users can only access their own data.
-   **Cursor-based Pagination:** Implemented for efficient handling of large datasets, avoiding the performance pitfalls of standard offset-based pagination.

### 🛡️ Advanced Security Measures
This API is fortified against common web vulnerabilities:
-   **XSS Protection:** Custom middleware for input sanitization (HTML/Script stripping).
-   **Rate Limiting:** Protects against Brute Force attacks (especially on auth endpoints).
-   **Secure Headers:** Implemented **Helmet** to set secure HTTP headers (HSTS, Frameguard, etc.).
-   **Injection Prevention:** -   Sanitization against **Prototype Pollution** (e.g., filtering `__proto__`).
    -   Parameterized queries to prevent **SQL Injection**.

### 🏗️ Architecture & Code Quality
-   **MVC Pattern:** Separation of concerns (Model, View, Controller) for maintainability.
-   **Global Error Handling:** Differentiates between Development (detailed stack traces) and Production (generic messages) errors.
-   **Validation:** Request validation using **Joi** and password strength checking via **zxcvbn**.

## 🛠️ Tech Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** PostgreSQL (using `pg` driver)
-   **Security Tools:** Helmet, XSS-Clean, Bcrypt, Express-Rate-Limit
-   **Dev Tools:** Postman, VS Code, pgAdmin

## 🚀 Getting Started

### Prerequisites
-   Node.js (v14+)
-   PostgreSQL installed and running

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MohammedWalid22/task-management-api.git](https://github.com/MohammedWalid22/task-management-api.git)
    cd task-management-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    DATABASE_URL=postgres://user:password@localhost:5432/taskdb
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=90d
    NODE_ENV=development
    ```

4.  **Run the application:**
    ```bash
    # Development Mode
    npm run dev
    
    # Production Mode
    npm start
    ```

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive JWT |
| `GET` | `/api/v1/tasks` | Get all tasks (Cursor Paginated) |
| `POST` | `/api/v1/tasks` | Create a new task |
| `PATCH` | `/api/v1/tasks/:id` | Update a task |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task |

## 👨‍💻 Author

Mohammed Walid  
Backend Developer (Node.js)  

LinkedIn: [https://www.linkedin.com/in/mohammed-waleed-2033872a7](https://www.linkedin.com/in/mohammed-waleed-2033872a7)  
GitHub: [https://github.com/MohammedWalid22](https://github.com/MohammedWalid22)  

---

## ⭐️ Support

If you found this project useful, don't forget to **star** the repo!

-------

## 📄 License

This project is licensed under the MIT License.

