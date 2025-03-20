const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Only admins and KUG leads can get all users
    if (req.user.role !== 'admin' && req.user.role !== 'lead') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const users = await pool.query(
      'SELECT id, name, email, city, role, profile_picture, created_at FROM users'
    );
    
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Users can only access their own profile unless they're admins or KUG leads
    if (req.user.id !== parseInt(id) && req.user.role !== 'admin' && req.user.role !== 'lead') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const user = await pool.query(
      'SELECT id, name, email, city, role, profile_picture, created_at FROM users WHERE id = $1',
      [id]
    );
    
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, city, profile_picture } = req.body;
    
    // Users can only update their own profile unless they're admins
    if (req.user.id !== parseInt(id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Check if user exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1, email = $2, city = $3, profile_picture = $4 WHERE id = $5 RETURNING id, name, email, city, role, profile_picture',
      [name, email, city, profile_picture, id]
    );
    
    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user role (admin only)
router.put('/:id/role', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    // Only admins and KUG leads can update roles
    if (req.user.role !== 'admin' && req.user.role !== 'lead') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // KUG leads can only promote to organizer or member
    if (req.user.role === 'lead' && (role === 'admin' || role === 'lead')) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Check if user exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user role
    const updatedUser = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, city, role',
      [role, id]
    );
    
    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user contributions
router.get('/:id/contributions', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const contributions = await pool.query(
      'SELECT c.*, u.name as user_name FROM contributions c JOIN users u ON c.user_id = u.id WHERE c.user_id = $1',
      [id]
    );
    
    res.json(contributions.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user events
router.get('/:id/events', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const events = await pool.query(
      'SELECT e.* FROM events e JOIN event_attendees ea ON e.id = ea.event_id WHERE ea.user_id = $1',
      [id]
    );
    
    res.json(events.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user badges
router.get('/:id/badges', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const badges = await pool.query(
      'SELECT b.* FROM badges b JOIN user_badges ub ON b.id = ub.badge_id WHERE ub.user_id = $1',
      [id]
    );
    
    res.json(badges.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
