const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Global Tech APIs are running correctly.');
});

const JWT_SECRET = 'your_super_secret_key_change_in_production';

// Mock Databases (since requirement said no signup, just login)
const users = {
  student: [
    { username: '2024j333', password: '2024j333' },
    { username: '2024s333', password: '2024s333' },
    { username: '2023j123', password: '2023j123' }
  ],
  teacher: [
    { username: '1234567', password: '1234567' },
    { username: '7654321', password: '7654321' }
  ],
  admin: [
    { username: 'admin1', password: 'SecurePassword123!' },
    { username: 'principal', password: 'CollegeAdmin@2026' }
  ]
};

// Generic Login Route
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  if (!['student', 'teacher', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  const userList = users[role];
  const user = userList.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username, role }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role, message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
