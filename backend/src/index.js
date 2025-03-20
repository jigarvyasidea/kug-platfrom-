require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize Firebase Admin (would use service account in production)
// For demo purposes, we'll just initialize without credentials
try {
  admin.initializeApp({
    // In production, you would use:
    // credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.log('Firebase admin initialization skipped for development');
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to KUG Advocacy Platform API' });
});

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const kugRoutes = require('./routes/kugs');
const eventRoutes = require('./routes/events');
const contributionRoutes = require('./routes/contributions');
const badgeRoutes = require('./routes/badges');
const leaderboardRoutes = require('./routes/leaderboards');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kugs', kugRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/leaderboards', leaderboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
