const request = require('supertest');
const express = require('express');
const app = express();

// Import routes
const authRoutes = require('../routes/auth');
const kugsRoutes = require('../routes/kugs');
const contributionsRoutes = require('../routes/contributions');
const eventsRoutes = require('../routes/events');
const leaderboardsRoutes = require('../routes/leaderboards');

// Mock middleware
jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      req.user = {
        id: 1,
        role: req.headers['x-user-role'] || 'member'
      };
      next();
    } else {
      res.status(401).json({ error: 'No token, authorization denied' });
    }
  };
});

// Mock database
jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mockPool) };
});

// Setup app
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/kugs', kugsRoutes);
app.use('/api/contributions', contributionsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/leaderboards', leaderboardsRoutes);

describe('Integration Tests', () => {
  let pool;
  
  beforeEach(() => {
    // Get the mocked pool
    pool = require('pg').Pool();
    pool.query.mockClear();
  });
  
  describe('User Registration and KUG Membership Flow', () => {
    it('should allow a user to register, login, and join a KUG', async () => {
      // Mock user registration
      pool.query.mockResolvedValueOnce({ rows: [] }); // No existing user
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          email: 'test@example.com', 
          role: 'member' 
        }] 
      });
      
      // Register user
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body).toHaveProperty('token');
      const token = registerResponse.body.token;
      
      // Mock login
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          email: 'test@example.com', 
          password: 'hashedPassword123', 
          role: 'member' 
        }] 
      });
      
      // Login user
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toHaveProperty('token');
      
      // Mock KUG list
      pool.query.mockResolvedValueOnce({ 
        rows: [
          { id: 1, name: 'KUG Bangalore', city: 'Bangalore', country: 'India', member_count: 120 },
          { id: 2, name: 'KUG Delhi', city: 'Delhi', country: 'India', member_count: 85 }
        ] 
      });
      
      // Get KUGs
      const kugsResponse = await request(app)
        .get('/api/kugs')
        .set('Authorization', `Bearer ${token}`);
      
      expect(kugsResponse.status).toBe(200);
      expect(kugsResponse.body).toHaveLength(2);
      
      // Mock KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // Mock not already a member
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock join KUG
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          user_id: 1, 
          kug_id: 1, 
          role: 'member',
          joined_at: new Date().toISOString()
        }] 
      });
      
      // Join KUG
      const joinResponse = await request(app)
        .post('/api/kugs/1/join')
        .set('Authorization', `Bearer ${token}`);
      
      expect(joinResponse.status).toBe(201);
      expect(joinResponse.body).toHaveProperty('user_id', 1);
      expect(joinResponse.body).toHaveProperty('kug_id', 1);
      expect(joinResponse.body).toHaveProperty('role', 'member');
    });
  });
  
  describe('Contribution Submission and Approval Flow', () => {
    it('should allow a user to submit a contribution and an admin to approve it', async () => {
      const token = 'mock-token';
      
      // Mock KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // Mock KUG membership check
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 1, kug_id: 1 }] });
      
      // Mock contribution creation
      const mockContribution = { 
        id: 1, 
        type: 'talk', 
        title: 'Introduction to Kotlin Coroutines', 
        description: 'A deep dive into Kotlin Coroutines',
        user_id: 1,
        kug_id: 1,
        date: new Date().toISOString(),
        points: 50,
        status: 'pending'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockContribution] });
      
      // Submit contribution
      const submitResponse = await request(app)
        .post('/api/contributions')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Introduction to Kotlin Coroutines',
          description: 'A deep dive into Kotlin Coroutines',
          type: 'talk',
          kug_id: 1,
          url: 'https://example.com/talk'
        });
      
      expect(submitResponse.status).toBe(201);
      expect(submitResponse.body).toHaveProperty('id', 1);
      expect(submitResponse.body).toHaveProperty('status', 'pending');
      
      // Mock contribution exists check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          kug_id: 1, 
          user_id: 1,
          status: 'pending' 
        }] 
      });
      
      // Mock KUG lead check (not a lead)
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock contribution approval
      const mockApprovedContribution = { 
        id: 1, 
        type: 'talk', 
        title: 'Introduction to Kotlin Coroutines', 
        status: 'approved',
        approved_by: 2,
        approved_at: new Date().toISOString()
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockApprovedContribution] });
      
      // Mock badge check (no new badges)
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          total: 1,
          talks: 1,
          blogs: 0,
          code: 0,
          events: 0
        }] 
      });
      
      // Approve contribution as admin
      const approveResponse = await request(app)
        .put('/api/contributions/1/approve')
        .set('Authorization', `Bearer ${token}`)
        .set('x-user-role', 'admin');
      
      expect(approveResponse.status).toBe(200);
      expect(approveResponse.body).toHaveProperty('id', 1);
      expect(approveResponse.body).toHaveProperty('status', 'approved');
      
      // Mock user exists check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          profile_picture: '/images/avatar1.png' 
        }] 
      });
      
      // Mock global ranking
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          total_points: 50, 
          rank: 1 
        }] 
      });
      
      // Mock KUG rankings
      pool.query.mockResolvedValueOnce({ 
        rows: [
          { kug_id: 1, kug_name: 'KUG Bangalore', total_points: 50, rank: 1 }
        ] 
      });
      
      // Mock contribution stats
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          total: 1,
          talks: 1,
          blogs: 0,
          code: 0,
          events: 0,
          total_points: 50
        }] 
      });
      
      // Mock badges
      pool.query.mockResolvedValueOnce({ 
        rows: [
          { id: 1, name: 'First Contribution', description: 'Made your first contribution', image_url: '/images/badge1.png', kug_name: 'KUG Bangalore', awarded_at: new Date().toISOString() }
        ] 
      });
      
      // Check user ranking
      const rankingResponse = await request(app)
        .get('/api/leaderboards/user/1')
        .set('Authorization', `Bearer ${token}`);
      
      expect(rankingResponse.status).toBe(200);
      expect(rankingResponse.body).toHaveProperty('user');
      expect(rankingResponse.body).toHaveProperty('global_ranking');
      expect(rankingResponse.body.global_ranking).toHaveProperty('rank', 1);
      expect(rankingResponse.body.global_ranking).toHaveProperty('total_points', 50);
      expect(rankingResponse.body.contribution_stats).toHaveProperty('total', 1);
      expect(rankingResponse.body.contribution_stats).toHaveProperty('talks', 1);
      expect(rankingResponse.body.badges).toHaveLength(1);
      expect(rankingResponse.body.badges[0]).toHaveProperty('name', 'First Contribution');
    });
  });
  
  describe('Event Creation and Registration Flow', () => {
    it('should allow a KUG lead to create an event and members to register', async () => {
      const token = 'mock-token';
      
      // Mock KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // Mock KUG lead check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          user_id: 1, 
          kug_id: 1, 
          role: 'lead' 
        }] 
      });
      
      // Mock event creation
      const mockEvent = { 
        id: 1, 
        title: 'Kotlin Workshop', 
        description: 'Hands-on Kotlin workshop',
        kug_id: 1,
        location: 'Tech Hub, Bangalore',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 3600000).toISOString(),
        type: 'workshop',
        max_attendees: 30,
        is_online: false,
        created_by: 1,
        status: 'published'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockEvent] });
      
      // Create event as KUG lead
      const createResponse = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Kotlin Workshop',
          description: 'Hands-on Kotlin workshop',
          kug_id: 1,
          location: 'Tech Hub, Bangalore',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 3600000).toISOString(),
          type: 'workshop',
          max_attendees: 30,
          is_online: false
        });
      
      expect(createResponse.status).toBe(201);
      expect(createResponse.body).toHaveProperty('id', 1);
      expect(createResponse.body).toHaveProperty('title', 'Kotlin Workshop');
      expect(createResponse.body).toHaveProperty('status', 'published');
      
      // Mock event exists check
      pool.query.mockResolvedValueOnce({ rows: [mockEvent] });
      
      // Mock attendee count
      pool.query.mockResolvedValueOnce({ rows: [{ count: '0' }] });
      
      // Mock not already registered
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock registration
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          event_id: 1, 
          user_id: 1, 
          registered_at: new Date().toISOString(),
          attended: false
        }] 
      });
      
      // Register for event
      const registerResponse = await request(app)
        .post('/api/events/1/register')
        .set('Authorization', `Bearer ${token}`);
      
      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body).toHaveProperty('event_id', 1);
      expect(registerResponse.body).toHaveProperty('user_id', 1);
      
      // Mock event with attendees
      const mockEventWithAttendees = {
        ...mockEvent,
        attendee_count: 1
      };
      
      // Mock event exists check
      pool.query.mockResolvedValueOnce({ rows: [mockEventWithAttendees] });
      
      // Get event details
      const eventResponse = await request(app)
        .get('/api/events/1')
        .set('Authorization', `Bearer ${token}`);
      
      expect(eventResponse.status).toBe(200);
      expect(eventResponse.body).toHaveProperty('id', 1);
      expect(eventResponse.body).toHaveProperty('title', 'Kotlin Workshop');
      expect(eventResponse.body).toHaveProperty('attendee_count', 1);
    });
  });
});
