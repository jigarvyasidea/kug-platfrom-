const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get all badges
router.get('/', async (req, res) => {
  try {
    const badges = await pool.query(
      'SELECT * FROM badges ORDER BY name'
    );
    
    res.json(badges.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get badge by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const badge = await pool.query(
      'SELECT * FROM badges WHERE id = $1',
      [id]
    );
    
    if (badge.rows.length === 0) {
      return res.status(404).json({ error: 'Badge not found' });
    }
    
    res.json(badge.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new badge (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Only admins can create badges
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const { name, description, image_url, criteria, points } = req.body;
    
    // Check if badge already exists
    const badgeCheck = await pool.query(
      'SELECT * FROM badges WHERE name = $1',
      [name]
    );
    
    if (badgeCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Badge already exists' });
    }
    
    // Create new badge
    const newBadge = await pool.query(
      'INSERT INTO badges (name, description, image_url, criteria, points) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, image_url, criteria, points]
    );
    
    res.status(201).json(newBadge.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update badge (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Only admins can update badges
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const { id } = req.params;
    const { name, description, image_url, criteria, points } = req.body;
    
    // Check if badge exists
    const badgeCheck = await pool.query(
      'SELECT * FROM badges WHERE id = $1',
      [id]
    );
    
    if (badgeCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Badge not found' });
    }
    
    // Update badge
    const updatedBadge = await pool.query(
      'UPDATE badges SET name = $1, description = $2, image_url = $3, criteria = $4, points = $5 WHERE id = $6 RETURNING *',
      [name, description, image_url, criteria, points, id]
    );
    
    res.json(updatedBadge.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get users who have earned a specific badge
router.get('/:id/users', async (req, res) => {
  try {
    const { id } = req.params;
    
    const users = await pool.query(
      `SELECT u.id, u.name, u.profile_picture, ub.awarded_at, k.name as kug_name 
       FROM users u 
       JOIN user_badges ub ON u.id = ub.user_id 
       JOIN kugs k ON ub.kug_id = k.id
       WHERE ub.badge_id = $1 
       ORDER BY ub.awarded_at DESC`,
      [id]
    );
    
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Award badge to user (admin or KUG lead only)
router.post('/award', authenticateToken, async (req, res) => {
  try {
    const { user_id, badge_id, kug_id } = req.body;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [kug_id]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    // Check if user is admin or KUG lead
    const isKugLead = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role = $3',
      [kug_id, req.user.id, 'lead']
    );
    
    if (req.user.role !== 'admin' && isKugLead.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Check if badge exists
    const badgeCheck = await pool.query(
      'SELECT * FROM badges WHERE id = $1',
      [badge_id]
    );
    
    if (badgeCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Badge not found' });
    }
    
    // Check if user already has this badge for this KUG
    const userBadgeCheck = await pool.query(
      'SELECT * FROM user_badges WHERE user_id = $1 AND badge_id = $2 AND kug_id = $3',
      [user_id, badge_id, kug_id]
    );
    
    if (userBadgeCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already has this badge for this KUG' });
    }
    
    // Award badge
    const awardedBadge = await pool.query(
      'INSERT INTO user_badges (user_id, badge_id, kug_id, awarded_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, badge_id, kug_id, req.user.id]
    );
    
    res.status(201).json(awardedBadge.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Revoke badge from user (admin only)
router.delete('/revoke', authenticateToken, async (req, res) => {
  try {
    // Only admins can revoke badges
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const { user_id, badge_id, kug_id } = req.body;
    
    // Check if user has this badge
    const userBadgeCheck = await pool.query(
      'SELECT * FROM user_badges WHERE user_id = $1 AND badge_id = $2 AND kug_id = $3',
      [user_id, badge_id, kug_id]
    );
    
    if (userBadgeCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User does not have this badge for this KUG' });
    }
    
    // Revoke badge
    await pool.query(
      'DELETE FROM user_badges WHERE user_id = $1 AND badge_id = $2 AND kug_id = $3',
      [user_id, badge_id, kug_id]
    );
    
    res.json({ message: 'Badge revoked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
