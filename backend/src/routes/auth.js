const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const admin = require('firebase-admin');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    
    // Check if user already exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, city, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, city, 'member']
    );
    
    // Create JWT token
    const token = jwt.sign(
      { id: newUser.rows[0].id, email: newUser.rows[0].email, role: newUser.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        city: newUser.rows[0].city,
        role: newUser.rows[0].role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        city: user.rows[0].city,
        role: user.rows[0].role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Google OAuth login
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;
    
    // Check if user exists
    let user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    // If user doesn't exist, create a new one
    if (user.rows.length === 0) {
      user = await pool.query(
        'INSERT INTO users (name, email, profile_picture, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, picture, 'member']
      );
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        city: user.rows[0].city,
        role: user.rows[0].role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
    
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await pool.query(
        'SELECT id, name, email, city, role, profile_picture FROM users WHERE id = $1',
        [verified.id]
      );
      
      if (user.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
