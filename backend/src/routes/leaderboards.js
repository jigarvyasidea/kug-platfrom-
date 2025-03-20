const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get global leaderboard
router.get('/global', async (req, res) => {
  try {
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
        COUNT(CASE WHEN c.type = 'event' THEN 1 END) as events,
        COUNT(DISTINCT ub.badge_id) as badge_count
      FROM 
        users u
      LEFT JOIN 
        contributions c ON u.id = c.user_id AND c.status = 'approved'
      LEFT JOIN
        user_badges ub ON u.id = ub.user_id
      GROUP BY 
        u.id, u.name, u.profile_picture
      ORDER BY 
        total_points DESC
      LIMIT 100`
    );
    
    res.json(leaderboard.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get KUG leaderboard
router.get('/kug/:kugId', async (req, res) => {
  try {
    const { kugId } = req.params;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [kugId]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
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
        COUNT(CASE WHEN c.type = 'event' THEN 1 END) as events,
        COUNT(DISTINCT ub.badge_id) as badge_count
      FROM 
        users u
      JOIN 
        kug_members km ON u.id = km.user_id
      LEFT JOIN 
        contributions c ON u.id = c.user_id AND c.kug_id = km.kug_id AND c.status = 'approved'
      LEFT JOIN
        user_badges ub ON u.id = ub.user_id AND ub.kug_id = km.kug_id
      WHERE 
        km.kug_id = $1
      GROUP BY 
        u.id, u.name, u.profile_picture
      ORDER BY 
        total_points DESC`,
      [kugId]
    );
    
    res.json(leaderboard.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get contribution type leaderboard
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    // Validate contribution type
    const validTypes = ['talk', 'blog', 'code', 'event'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid contribution type' });
    }
    
    const leaderboard = await pool.query(
      `SELECT 
        u.id, 
        u.name, 
        u.profile_picture, 
        SUM(c.points) as total_points,
        COUNT(c.id) as contribution_count
      FROM 
        users u
      JOIN 
        contributions c ON u.id = c.user_id
      WHERE 
        c.type = $1 AND c.status = 'approved'
      GROUP BY 
        u.id, u.name, u.profile_picture
      ORDER BY 
        total_points DESC
      LIMIT 100`,
      [type]
    );
    
    res.json(leaderboard.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user ranking
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get user's global ranking
    const globalRanking = await pool.query(
      `WITH user_points AS (
        SELECT 
          u.id, 
          u.name, 
          SUM(COALESCE(c.points, 0)) as total_points
        FROM 
          users u
        LEFT JOIN 
          contributions c ON u.id = c.user_id AND c.status = 'approved'
        GROUP BY 
          u.id, u.name
        ORDER BY 
          total_points DESC
      )
      SELECT 
        id, 
        name, 
        total_points,
        RANK() OVER (ORDER BY total_points DESC) as rank
      FROM 
        user_points
      WHERE 
        id = $1`,
      [userId]
    );
    
    // Get user's KUG rankings
    const kugRankings = await pool.query(
      `WITH kug_user_points AS (
        SELECT 
          k.id as kug_id,
          k.name as kug_name,
          u.id as user_id, 
          u.name as user_name, 
          SUM(COALESCE(c.points, 0)) as total_points
        FROM 
          kugs k
        JOIN
          kug_members km ON k.id = km.kug_id
        JOIN
          users u ON km.user_id = u.id
        LEFT JOIN 
          contributions c ON u.id = c.user_id AND c.kug_id = k.id AND c.status = 'approved'
        GROUP BY 
          k.id, k.name, u.id, u.name
      )
      SELECT 
        kug_id,
        kug_name, 
        total_points,
        RANK() OVER (PARTITION BY kug_id ORDER BY total_points DESC) as rank
      FROM 
        kug_user_points
      WHERE 
        user_id = $1`,
      [userId]
    );
    
    // Get user's contribution stats
    const contributionStats = await pool.query(
      `SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN type = 'talk' THEN 1 END) as talks,
        COUNT(CASE WHEN type = 'blog' THEN 1 END) as blogs,
        COUNT(CASE WHEN type = 'code' THEN 1 END) as code,
        COUNT(CASE WHEN type = 'event' THEN 1 END) as events,
        SUM(points) as total_points
      FROM 
        contributions
      WHERE 
        user_id = $1 AND status = 'approved'`,
      [userId]
    );
    
    // Get user's badges
    const badges = await pool.query(
      `SELECT 
        b.id, 
        b.name, 
        b.description, 
        b.image_url, 
        k.name as kug_name,
        ub.awarded_at
      FROM 
        badges b
      JOIN 
        user_badges ub ON b.id = ub.badge_id
      JOIN
        kugs k ON ub.kug_id = k.id
      WHERE 
        ub.user_id = $1
      ORDER BY 
        ub.awarded_at DESC`,
      [userId]
    );
    
    res.json({
      user: {
        id: userCheck.rows[0].id,
        name: userCheck.rows[0].name,
        profile_picture: userCheck.rows[0].profile_picture
      },
      global_ranking: globalRanking.rows[0] || { rank: 'N/A', total_points: 0 },
      kug_rankings: kugRankings.rows,
      contribution_stats: contributionStats.rows[0],
      badges: badges.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get monthly leaderboard
router.get('/monthly', async (req, res) => {
  try {
    // Get current month's start and end dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const leaderboard = await pool.query(
      `SELECT 
        u.id, 
        u.name, 
        u.profile_picture, 
        SUM(c.points) as total_points,
        COUNT(c.id) as contribution_count
      FROM 
        users u
      JOIN 
        contributions c ON u.id = c.user_id
      WHERE 
        c.status = 'approved' AND
        c.date >= $1 AND c.date <= $2
      GROUP BY 
        u.id, u.name, u.profile_picture
      ORDER BY 
        total_points DESC
      LIMIT 100`,
      [startOfMonth, endOfMonth]
    );
    
    res.json({
      month: now.toLocaleString('default', { month: 'long' }),
      year: now.getFullYear(),
      leaderboard: leaderboard.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
