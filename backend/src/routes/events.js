const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await pool.query(
      `SELECT e.*, k.name as kug_name, k.city as kug_city, 
       (SELECT COUNT(*) FROM event_attendees WHERE event_id = e.id) as attendee_count
       FROM events e 
       JOIN kugs k ON e.kug_id = k.id 
       ORDER BY e.start_date DESC`
    );
    
    res.json(events.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await pool.query(
      `SELECT e.*, k.name as kug_name, k.city as kug_city, 
       (SELECT COUNT(*) FROM event_attendees WHERE event_id = e.id) as attendee_count
       FROM events e 
       JOIN kugs k ON e.kug_id = k.id 
       WHERE e.id = $1`,
      [id]
    );
    
    if (event.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new event (KUG lead or organizer only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      kug_id, 
      location, 
      start_date, 
      end_date, 
      type, 
      max_attendees, 
      is_online, 
      meeting_link, 
      banner_image 
    } = req.body;
    
    // Check if KUG exists
    const kugCheck = await pool.query(
      'SELECT * FROM kugs WHERE id = $1',
      [kug_id]
    );
    
    if (kugCheck.rows.length === 0) {
      return res.status(404).json({ error: 'KUG not found' });
    }
    
    // Check if user is admin, KUG lead, or organizer
    const isKugMember = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role IN ($3, $4)',
      [kug_id, req.user.id, 'lead', 'organizer']
    );
    
    if (req.user.role !== 'admin' && isKugMember.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Create new event
    const newEvent = await pool.query(
      `INSERT INTO events (
        title, description, kug_id, location, start_date, end_date, 
        type, max_attendees, is_online, meeting_link, banner_image, 
        created_by, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        title, description, kug_id, location, start_date, end_date, 
        type, max_attendees, is_online, meeting_link, banner_image, 
        req.user.id, 'published'
      ]
    );
    
    res.status(201).json(newEvent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update event (KUG lead, organizer, or event creator only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      location, 
      start_date, 
      end_date, 
      type, 
      max_attendees, 
      is_online, 
      meeting_link, 
      banner_image,
      status 
    } = req.body;
    
    // Check if event exists
    const eventCheck = await pool.query(
      'SELECT * FROM events WHERE id = $1',
      [id]
    );
    
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if user is admin, KUG lead, organizer, or event creator
    const isKugMember = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role IN ($3, $4)',
      [eventCheck.rows[0].kug_id, req.user.id, 'lead', 'organizer']
    );
    
    if (req.user.role !== 'admin' && 
        isKugMember.rows.length === 0 && 
        eventCheck.rows[0].created_by !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Update event
    const updatedEvent = await pool.query(
      `UPDATE events SET 
        title = $1, 
        description = $2, 
        location = $3, 
        start_date = $4, 
        end_date = $5, 
        type = $6, 
        max_attendees = $7, 
        is_online = $8, 
        meeting_link = $9, 
        banner_image = $10,
        status = $11,
        updated_at = NOW()
      WHERE id = $12 RETURNING *`,
      [
        title, 
        description, 
        location, 
        start_date, 
        end_date, 
        type, 
        max_attendees, 
        is_online, 
        meeting_link, 
        banner_image,
        status, 
        id
      ]
    );
    
    res.json(updatedEvent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get event attendees
router.get('/:id/attendees', async (req, res) => {
  try {
    const { id } = req.params;
    
    const attendees = await pool.query(
      `SELECT u.id, u.name, u.email, u.profile_picture, ea.registered_at, ea.attended 
       FROM users u 
       JOIN event_attendees ea ON u.id = ea.user_id 
       WHERE ea.event_id = $1 
       ORDER BY ea.registered_at`,
      [id]
    );
    
    res.json(attendees.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register for event
router.post('/:id/register', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if event exists
    const eventCheck = await pool.query(
      'SELECT * FROM events WHERE id = $1',
      [id]
    );
    
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if event is full
    const attendeeCount = await pool.query(
      'SELECT COUNT(*) FROM event_attendees WHERE event_id = $1',
      [id]
    );
    
    if (eventCheck.rows[0].max_attendees && 
        parseInt(attendeeCount.rows[0].count) >= eventCheck.rows[0].max_attendees) {
      return res.status(400).json({ error: 'Event is full' });
    }
    
    // Check if user is already registered
    const registrationCheck = await pool.query(
      'SELECT * FROM event_attendees WHERE event_id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (registrationCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }
    
    // Register for event
    const registration = await pool.query(
      'INSERT INTO event_attendees (event_id, user_id) VALUES ($1, $2) RETURNING *',
      [id, req.user.id]
    );
    
    res.status(201).json(registration.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel registration
router.delete('/:id/register', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is registered
    const registrationCheck = await pool.query(
      'SELECT * FROM event_attendees WHERE event_id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (registrationCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Not registered for this event' });
    }
    
    // Cancel registration
    await pool.query(
      'DELETE FROM event_attendees WHERE event_id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark attendance (KUG lead or organizer only)
router.put('/:id/attendees/:userId', authenticateToken, async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { attended } = req.body;
    
    // Check if event exists
    const eventCheck = await pool.query(
      'SELECT * FROM events WHERE id = $1',
      [id]
    );
    
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if user is admin, KUG lead, or organizer
    const isKugMember = await pool.query(
      'SELECT * FROM kug_members WHERE kug_id = $1 AND user_id = $2 AND role IN ($3, $4)',
      [eventCheck.rows[0].kug_id, req.user.id, 'lead', 'organizer']
    );
    
    if (req.user.role !== 'admin' && isKugMember.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Update attendance
    const updatedAttendance = await pool.query(
      'UPDATE event_attendees SET attended = $1 WHERE event_id = $2 AND user_id = $3 RETURNING *',
      [attended, id, userId]
    );
    
    if (updatedAttendance.rows.length === 0) {
      return res.status(404).json({ error: 'Attendee not found' });
    }
    
    res.json(updatedAttendance.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
