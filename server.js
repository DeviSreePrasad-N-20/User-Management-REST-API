
require('dotenv').config();
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const FILE_PATH = './users.json';

//
// 🔧 Helper Functions
//
const readUsers = () => {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

const generateId = (users) => {
  return users.length ? users[users.length - 1].id + 1 : 1;
};

//
// ✅ GET /users (search + sort)
//
app.get('/users', (req, res) => {
  let users = readUsers();

  const { search, sort, order } = req.query;

  // 🔍 Search
  if (search) {
    users = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🔃 Sort
  if (sort) {
    users.sort((a, b) => {
      if (a[sort] < b[sort]) return order === 'desc' ? 1 : -1;
      if (a[sort] > b[sort]) return order === 'desc' ? -1 : 1;
      return 0;
    });
  }

  res.json(users);
});

//
// ✅ GET /users/:id
//
app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

//
// ✅ POST /users
//
app.post('/users', (req, res) => {
  const users = readUsers();
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const newUser = {
    id: generateId(users),
    name,
    email
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json(newUser);
});

//
// ✅ PUT /users/:id
//
app.put('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  writeUsers(users);

  res.json(user);
});

//
// ✅ DELETE /users/:id
//
app.delete('/users/:id', (req, res) => {
  let users = readUsers();
  const index = users.findIndex(u => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  writeUsers(users);

  res.json({ message: "User deleted successfully" });
});

//
// 🚀 Start Server
//
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
