# User Management REST API

A simple Node.js + Express REST API for user management with persistent storage using a JSON file.

## Features
- List all users with optional search and sorting
- Get user details by ID
- Create a new user
- Update an existing user
- Delete a user
- Persistent storage in `users.json`

## Project Structure
```
user-api/
│
├── server.js
├── users.json
├── package.json
├── .env
```

## Getting Started (Local)

### 1. Clone the repository
```
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

### 2. Install dependencies
```
npm install
```

### 3. Set environment variables
Create a `.env` file in the root directory:
```
PORT=3000
```

### 4. Start the server
```
npm start
```

The API will be running at `http://localhost:3000`

---

## API Endpoints

### List Users
- **GET** `/users`
- Optional query params:
  - `search` (search by name or email)
  - `sort` (field to sort by, e.g. `name`)
  - `order` (`asc` or `desc`)
- **Example:**
  - `GET /users?search=prasad&sort=name&order=asc`

### Get User by ID
- **GET** `/users/:id`
- **Example:**
  - `GET /users/1`

### Create User
- **POST** `/users`
- **Body:**
```json
{
  "name": "Amit",
  "email": "amit@example.com"
}
```

### Update User
- **PUT** `/users/:id`
- **Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

### Delete User
- **DELETE** `/users/:id`

---

## Notes
- All data is stored in `users.json`. Changes persist as long as the file is not deleted or overwritten.
- On most cloud platforms, file storage is not persistent. For production, use a real database.
- No authentication is required by default.

---

## Example cURL Requests

**List users:**
```
curl http://localhost:3000/users
```

**Get user by ID:**
```
curl http://localhost:3000/users/1
```

**Create user:**
```
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Amit","email":"amit@example.com"}'
```

**Update user:**
```
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Updated Name"}'
```

**Delete user:**
```
curl -X DELETE http://localhost:3000/users/1
```
