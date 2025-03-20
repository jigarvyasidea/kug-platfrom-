const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get all KUGs
router.get('/', async (req, res) => {
  try {
    const kugs = await pool.query(
      'SELECT * FROM kugs ORDER BY name'
    );
    
    res.json(kugs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get KUG by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const kug = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [id]
    );
    
    if (kug.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    res.json(kug.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new KUG (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Only admins can create KUGs
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const { name, city, description, website, logo, banner, social_media } = req.body;
    
    // Check if KUG already exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE name = $1 OR city = $2',
      [name, city]
    );
    
    if (kugCheck.rows.length > 0) {
      return res.status(400).json({ error: 'KUG already exists' });
    }
    
    // Create new KUG
    const newKug = await pool.query(
      'INSERT INTO kugs (name, city, description, website, logo, banner, social_media) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, city, description, website, logo, banner, social_media]
    );
    
    res.status(201).json(newKug.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update KUG (admin or KUG lead only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, description, website, logo, banner, social_media } = req.body;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [id]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    // Check if user is admin or KUG lead
    const isKugLead = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role = $3',
      [id, req.user.id, 'lead']
    );
    
    if (req.user.role !== 'admin' && isKugLead.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Update KUG
    const updatedKug = await pool.query(
      'UPDATE kugs SET name = $1, city = $2, description = $3, website = $4, logo = $5, banner = $6, social_media = $7 WHERE id = $8 RETURNING *',
      [name, city, description, website, logo, banner, social_media, id]
    );
    
    res.json(updatedKug.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get KUG members
router.get('/:id/members', async (req, res) => {
  try {
    const { id } = req.params;
    
    const members = await pool.query(
      'SELECT u.id, u.name, u.email, u.profile_picture, km.role, km.joined_at FROM users u JOIN kug_members km ON u.id = km.user_id WHERE km.kug_id = $1 ORDER BY km.role, u.name',
      [id]
    );
    
    res.json(members.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add member to KUG
router.post('/:id/members', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, role } = req.body;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [id]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    // Check if user is already a member
    const memberCheck = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2',
      [id, user_id]
    );
    
    if (memberCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User is already a member' });
    }
    
    // Add member
    const newMember = await pool.query(
      'INSERT INTO kug_members (kug_id, user_id, role) VALUES ($1, $2, $3) RETURNING *',
      [id, user_id, role || 'member']
    );
    
    res.status(201).json(newMember.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update member role (admin or KUG lead only)
router.put('/:id/members/:userId', authenticateToken, async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { role } = req.body;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [id]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    // Check if user is admin or KUG lead
    const isKugLead = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role = $3',
      [id, req.user.id, 'lead']
    );
    
    if (req.user.role !== 'admin' && isKugLead.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Update member role
    const updatedMember = await pool.query(
      'UPDATE kug_members SET role = $1 WHERE kug_id = $2 AND user_id = $3 RETURNING *',
      [role, id, userId]
    );
    
    if (updatedMember.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json(updatedMember.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get KUG events
router.get('/:id/events', async (req, res) => {
  try {
    const { id } = req.params;
    
    const events = await pool.query(
      'SELECT * FROM events WHERE kug_id = $1 ORDER BY start_date DESC',
      [id]
    );
    
    res.json(events.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get KUG contributions
router.get('/:id/contributions', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contributions = await pool.query(
      'SELECT c.*, u.name as user_name FROM contributions c JOIN users u ON c.user_id = u.id WHERE c.kug_id = $1 ORDER BY c.created_at DESC',
      [id]
    );
    
    res.json(contributions.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get KUG leaderboard
router.get('/:id/leaderboard', async (req, res) => {
  try {
    const { id } = req.params;
    
    const leaderboard = await pool.query(
      `SELECT 
        u.id, 
        u.name, 
        u.profile_picture, 
        SUM(c.points) as total_points,
        COUNT(c.id) as contribution_count,
        COUNT(CASE WHEN c.type = 'talk' THEN 1 END) as talks,
        COUNT(CASE WHEN c.type = 'blog' THEN 1 END) as blogs,
        COUNT(CASE WHEN c.type = 'code' THEN 1 END) as code,
        COUNT(CASE WHEN c.type = 'event' THEN 1 END) as events
      FROM 
        users u
      JOIN 
        kug_members km ON u.id = km.user_id
      LEFT JOIN 
        contributions c ON u.id = c.user_id AND c.kug_id = km.kug_id
      WHERE 
        km.kug_id = $1
      GROUP BY 
        u.id, u.name, u.profile_picture
      ORDER BY 
        total_points DESC`,
      [id]
    );
    
    res.json(leaderboard.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
