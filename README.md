# Image Management App

Welcome to the Image Management App, a full-stack solution for efficiently managing and categorizing a collection of images. This app includes robust features such as user authentication and authorization, role-based access control (RBAC), image upload and management, pagination, error handling, and logging.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Getting Started](#getting-started)
3. [System Design](#system-design)
4. [Features](#features)
5. [How to Test](#how-to-test)

## System Requirements

- Node.js
- React
- Express
- JavaScript
- Material UI ,HTML ,CSS

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ritik2727/origin-medical.git
```

2. Navigate to the project directory:

```bash
cd origin-medical
```

3.  Install dependencies for frontend:

```bash
cd frontend
npm install
```

Install dependencies for backend:

```bash
cd backend
npm install
```

4. Start the application:

for frontend:

```bash
cd frontend
npm start
```

for backend:

```bash
cd backend
npm start
```

frontend at http://localhost:3000/
backend at http://localhost:5000/

## System Design

The system is designed to provide users with a secure and intuitive way to manage and categorize a collection of images. It incorporates user authentication and authorization, role-based access control (RBAC), image upload and management, lazy loading, pagination, error handling, and logging.

**System Architecture:**

- **User Authentication and Authorization:**

  - Secure login page with authentication and authorization mechanisms.
  - Support for two types of users: normal users and administrators.
  - Different access levels for normal users and administrators.

- **Image Upload and Management:**

  - Admins can upload images to the system.
  - Uploaded images are stored locally via the backend solution.

- **Role-Based Access Control (RBAC):**

  - Robust RBAC system with two roles: normal user and administrator.
  - Different permissions for normal users and administrators.

- **Lazy Loading and Pagination:**
  - Lazy loading for images to optimize performance.
  - Dynamic loading of images as the user scrolls through the page.
  - Pagination to efficiently handle a large number of images.

## Features

- User authentication and authorization.
- Role-based access control (RBAC) with two roles: normal user and administrator.
- Image upload and management.
- Lazy loading and pagination for optimized performance.
- Error handling and logging for graceful error management.
- Dashboard pages for normal users and administrators.

## How to Test

1. Run the application:

```bash
npm start
```

2. Access the app: Open your web browser and go to http://localhost:3000/

3. Test user authentication:
   - Log in with the registered user or administrator credentials.
        ```bash
        username: admin
        password: admin
        ```
           ```bash
        username: user
        password: user
        ```

4. Test image upload:
   - As an administrator, navigate to the admin dashboard.
   - Upload new images and assign labels.

5. Test lazy loading and pagination:
   - Scroll through the dashboard pages and observe the lazy loading of images.
   - Test pagination to navigate through a large number of images.

6. Test error handling and logging:
   - Intentionally trigger errors and observe the application's behavior.
   - Check the logs for error details.

Feel free to explore and test the various features of this Image Management App. If you encounter any issues or have suggestions for improvement, please refer to the error handling and logging mechanisms for guidance.
```
