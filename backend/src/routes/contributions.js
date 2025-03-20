const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get all contributions
router.get('/', async (req, res) => {
  try {
    const contributions = await pool.query(
      `SELECT c.*, u.name as user_name, k.name as kug_name 
       FROM contributions c 
       JOIN users u ON c.user_id = u.id 
       JOIN kugs k ON c.kug_id = k.id 
       ORDER BY c.created_at DESC`
    );
    
    res.json(contributions.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get contribution by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contribution = await pool.query(
      `SELECT c.*, u.name as user_name, k.name as kug_name 
       FROM contributions c 
       JOIN users u ON c.user_id = u.id 
       JOIN kugs k ON c.kug_id = k.id 
       WHERE c.id = $1`,
      [id]
    );
    
    if (contribution.rows.length === 0) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    
    res.json(contribution.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new contribution
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      type, 
      kug_id, 
      url, 
      date, 
      points,
      status
    } = req.body;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [kug_id]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    // Check if user is a member of the KUG
    const memberCheck = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2',
      [kug_id, req.user.id]
    );
    
    if (memberCheck.rows.length === 0) {
      return res.status(403).json({ error: 'You must be a member of this KUG to submit contributions' });
    }
    
    // Create new contribution
    const newContribution = await pool.query(
      `INSERT INTO contributions (
        title, description, type, user_id, kug_id, url, date, points, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        title, 
        description, 
        type, 
        req.user.id, 
        kug_id, 
        url, 
        date || new Date(), 
        points || getDefaultPoints(type),
        status || 'pending'
      ]
    );
    
    res.status(201).json(newContribution.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update contribution (owner, admin, or KUG lead only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      type, 
      url, 
      date, 
      points,
      status
    } = req.body;
    
    // Check if contribution exists
    const contributionCheck = await pool.query(
      'SELECT * FROM contributions WHERE id = $1',
      [id]
    );
    
    if (contributionCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    
    // Check if user is owner, admin, or KUG lead
    const isKugLead = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role = $3',
      [contributionCheck.rows[0].kug_id, req.user.id, 'lead']
    );
    
    if (req.user.id !== contributionCheck.rows[0].user_id && 
        req.user.role !== 'admin' && 
        isKugLead.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Update contribution
    const updatedContribution = await pool.query(
      `UPDATE contributions SET 
        title = $1, 
        description = $2, 
        type = $3, 
        url = $4, 
        date = $5, 
        points = $6,
        status = $7,
        updated_at = NOW()
      WHERE id = $8 RETURNING *`,
      [
        title || contributionCheck.rows[0].title, 
        description || contributionCheck.rows[0].description, 
        type || contributionCheck.rows[0].type, 
        url || contributionCheck.rows[0].url, 
        date || contributionCheck.rows[0].date, 
        points || contributionCheck.rows[0].points,
        status || contributionCheck.rows[0].status,
        id
      ]
    );
    
    res.json(updatedContribution.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve contribution (admin or KUG lead only)
router.put('/:id/approve', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if contribution exists
    const contributionCheck = await pool.query(
      'SELECT * FROM contributions WHERE id = $1',
      [id]
    );
    
    if (contributionCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    
    // Check if user is admin or KUG lead
    const isKugLead = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role = $3',
      [contributionCheck.rows[0].kug_id, req.user.id, 'lead']
    );
    
    if (req.user.role !== 'admin' && isKugLead.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Approve contribution
    const approvedContribution = await pool.query(
      `UPDATE contributions SET 
        status = 'approved',
        approved_by = $1,
        approved_at = NOW(),
        updated_at = NOW()
      WHERE id = $2 RETURNING *`,
      [req.user.id, id]
    );
    
    // Check if user has earned any badges
    await checkAndAwardBadges(contributionCheck.rows[0].user_id, contributionCheck.rows[0].kug_id);
    
    res.json(approvedContribution.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject contribution (admin or KUG lead only)
router.put('/:id/reject', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    // Check if contribution exists
    const contributionCheck = await pool.query(
      'SELECT * FROM contributions WHERE id = $1',
      [id]
    );
    
    if (contributionCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    
    // Check if user is admin or KUG lead
    const isKugLead = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role = $3',
      [contributionCheck.rows[0].kug_id, req.user.id, 'lead']
    );
    
    if (req.user.role !== 'admin' && isKugLead.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Reject contribution
    const rejectedContribution = await pool.query(
      `UPDATE contributions SET 
        status = 'rejected',
        rejection_reason = $1,
        rejected_by = $2,
        rejected_at = NOW(),
        updated_at = NOW()
      WHERE id = $3 RETURNING *`,
      [reason, req.user.id, id]
    );
    
    res.json(rejectedContribution.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to get default points based on contribution type
function getDefaultPoints(type) {
  switch (type) {
    case 'talk':
      return 50;
    case 'blog':
      return 30;
    case 'code':
      return 40;
    case 'event':
      return 60;
    default:
      return 20;
  }
}

// Helper function to check and award badges
async function checkAndAwardBadges(userId, kugId) {
  try {
    // Get user's approved contributions count by type
    const contributionCounts = await pool.query(
      `SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN type = 'talk' THEN 1 END) as talks,
        COUNT(CASE WHEN type = 'blog' THEN 1 END) as blogs,
        COUNT(CASE WHEN type = 'code' THEN 1 END) as code,
        COUNT(CASE WHEN type = 'event' THEN 1 END) as events
      FROM contributions 
      WHERE user_id = $1 AND kug_id = $2 AND status = 'approved'`,
      [userId, kugId]
    );
    
    const counts = contributionCounts.rows[0];
    
    // Check for badges
    const badges = [];
    
    // First Contribution Badge
    if (counts.total >= 1) {
      badges.push('first_contribution');
    }
    
    // Active Contributor Badge (5+ contributions)
    if (counts.total >= 5) {
      badges.push('active_contributor');
    }
    
    // Speaker Badge (3+ talks)
    if (counts.talks >= 3) {
      badges.push('speaker');
    }
    
    // Writer Badge (3+ blogs)
    if (counts.blogs >= 3) {
      badges.push('writer');
    }
    
    // Coder Badge (3+ code contributions)
    if (counts.code >= 3) {
      badges.push('coder');
    }
    
    // Organizer Badge (3+ event contributions)
    if (counts.events >= 3) {
      badges.push('organizer');
    }
    
    // Kotlin Expert Badge (10+ contributions of any type)
    if (counts.total >= 10) {
      badges.push('kotlin_expert');
    }
    
    // Award badges
    for (const badgeName of badges) {
      // Check if badge exists
      const badgeCheck = await pool.query(
        'SELECT * FROM badges WHERE name = $1',
        [badgeName]
      );
      
      if (badgeCheck.rows.length === 0) continue;
      
      const badgeId = badgeCheck.rows[0].id;
      
      // Check if user already has this badge
      const userBadgeCheck = await pool.query(
        'SELECT * FROM user_badges WHERE user_id = $1 AND badge_id = $2',
        [userId, badgeId]
      );
      
      if (userBadgeCheck.rows.length === 0) {
        // Award badge
        await pool.query(
          'INSERT INTO user_badges (user_id, badge_id, kug_id) VALUES ($1, $2, $3)',
          [userId, badgeId, kugId]
        );
      }
    }
  } catch (error) {
    console.error('Error awarding badges:', error);
  }
}

module.exports = router;
