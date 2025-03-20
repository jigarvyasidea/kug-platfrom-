const request = require('supertest');
const express = require('express');
const contributionsRoutes = require('../routes/contributions');

// Mock dependencies
jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mockPool) };
});

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

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/contributions', contributionsRoutes);

describe('Contributions API Routes', () => {
  let pool;
  
  beforeEach(() => {
    // Get the mocked pool
    pool = require('pg').Pool();
    pool.query.mockClear();
  });
  
  describe('GET /api/contributions', () => {
    it('should return all contributions', async () => {
      // Mock contributions data
      const mockContributions = [
        { 
          id: 1, 
          type: 'talk', 
          title: 'Introduction to Kotlin Coroutines', 
          user_id: 1,
          user_name: 'John Doe',
          kug_id: 1,
          kug_name: 'KUG Bangalore',
          date: '2023-03-10T00:00:00.000Z',
          points: 50,
          status: 'approved'
        },
        { 
          id: 2, 
          type: 'blog', 
          title: 'Kotlin Flow vs RxJava', 
          user_id: 2,
          user_name: 'Jane Smith',
          kug_id: 2,
          kug_name: 'KUG Delhi',
          date: '2023-04-15T00:00:00.000Z',
          points: 30,
          status: 'approved'
        }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockContributions });
      
      const response = await request(app).get('/api/contributions');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('title', 'Introduction to Kotlin Coroutines');
      expect(response.body[1]).toHaveProperty('id', 2);
      expect(response.body[1]).toHaveProperty('title', 'Kotlin Flow vs RxJava');
    });
    
    it('should handle database errors', async () => {
      // Mock database error
      pool.query.mockRejectedValueOnce(new Error('Database error'));
      
      const response = await request(app).get('/api/contributions');
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Server error');
    });
  });
  
  describe('GET /api/contributions/:id', () => {
    it('should return a specific contribution by ID', async () => {
      // Mock contribution data
      const mockContribution = { 
        id: 1, 
        type: 'talk', 
        title: 'Introduction to Kotlin Coroutines', 
        description: 'A deep dive into Kotlin Coroutines',
        user_id: 1,
        user_name: 'John Doe',
        kug_id: 1,
        kug_name: 'KUG Bangalore',
        date: '2023-03-10T00:00:00.000Z',
        points: 50,
        status: 'approved',
        url: 'https://example.com/talk',
        approved_by: 2,
        approved_at: '2023-03-12T00:00:00.000Z'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockContribution] });
      
      const response = await request(app).get('/api/contributions/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title', 'Introduction to Kotlin Coroutines');
      expect(response.body).toHaveProperty('type', 'talk');
      expect(response.body).toHaveProperty('user_name', 'John Doe');
      expect(response.body).toHaveProperty('kug_name', 'KUG Bangalore');
      expect(response.body).toHaveProperty('status', 'approved');
    });
    
    it('should return 404 if contribution is not found', async () => {
      // Mock empty result
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app).get('/api/contributions/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Contribution not found');
    });
  });
  
  describe('POST /api/contributions', () => {
    it('should create a new contribution', async () => {
      // Mock KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // Mock KUG membership check
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 1, kug_id: 1 }] });
      
      // Mock contribution creation
      const mockContribution = { 
        id: 3, 
        type: 'code', 
        title: 'Kotlin Multiplatform Library', 
        description: 'A shared library for Android and iOS',
        user_id: 1,
        kug_id: 1,
        date: '2023-05-20T00:00:00.000Z',
        points: 40,
        status: 'pending'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockContribution] });
      
      const response = await request(app)
        .post('/api/contributions')
        .set('Authorization', 'Bearer token')
        .send({
          title: 'Kotlin Multiplatform Library',
          description: 'A shared library for Android and iOS',
          type: 'code',
          kug_id: 1,
          url: 'https://github.com/user/repo'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id', 3);
      expect(response.body).toHaveProperty('title', 'Kotlin Multiplatform Library');
      expect(response.body).toHaveProperty('type', 'code');
      expect(response.body).toHaveProperty('status', 'pending');
    });
    
    it('should return 404 if KUG does not exist', async () => {
      // Mock KUG not found
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app)
        .post('/api/contributions')
        .set('Authorization', 'Bearer token')
        .send({
          title: 'Kotlin Multiplatform Library',
          description: 'A shared library for Android and iOS',
          type: 'code',
          kug_id: 999,
          url: 'https://github.com/user/repo'
        });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'KUG not found');
    });
    
    it('should return 403 if user is not a member of the KUG', async () => {
      // Mock KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // Mock KUG membership check (not a member)
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app)
        .post('/api/contributions')
        .set('Authorization', 'Bearer token')
        .send({
          title: 'Kotlin Multiplatform Library',
          description: 'A shared library for Android and iOS',
          type: 'code',
          kug_id: 1,
          url: 'https://github.com/user/repo'
        });
      
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'You must be a member of this KUG to submit contributions');
    });
  });
  
  describe('PUT /api/contributions/:id/approve', () => {
    it('should approve a contribution if user is KUG lead', async () => {
      // Mock contribution exists check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 3, 
          kug_id: 1, 
          user_id: 2,
          status: 'pending' 
        }] 
      });
      
      // Mock KUG lead check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          user_id: 1, 
          kug_id: 1, 
          role: 'lead' 
        }] 
      });
      
      // Mock contribution approval
      const mockApprovedContribution = { 
        id: 3, 
        type: 'code', 
        title: 'Kotlin Multiplatform Library', 
        status: 'approved',
        approved_by: 1,
        approved_at: '2023-05-22T00:00:00.000Z'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockApprovedContribution] });
      
      // Mock badge check (no new badges)
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          total: 1,
          talks: 0,
          blogs: 0,
          code: 1,
          events: 0
        }] 
      });
      
      const response = await request(app)
        .put('/api/contributions/3/approve')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'member'); // Role from middleware is overridden by KUG lead check
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 3);
      expect(response.body).toHaveProperty('status', 'approved');
      expect(response.body).toHaveProperty('approved_by', 1);
    });
    
    it('should approve a contribution if user is admin', async () => {
      // Mock contribution exists check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 3, 
          kug_id: 1, 
          user_id: 2,
          status: 'pending' 
        }] 
      });
      
      // Mock KUG lead check (not a lead)
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock contribution approval
      const mockApprovedContribution = { 
        id: 3, 
        type: 'code', 
        title: 'Kotlin Multiplatform Library', 
        status: 'approved',
        approved_by: 1,
        approved_at: '2023-05-22T00:00:00.000Z'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockApprovedContribution] });
      
      // Mock badge check (no new badges)
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          total: 1,
          talks: 0,
          blogs: 0,
          code: 1,
          events: 0
        }] 
      });
      
      const response = await request(app)
        .put('/api/contributions/3/approve')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'admin');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 3);
      expect(response.body).toHaveProperty('status', 'approved');
    });
    
    it('should return 403 if user is not admin or KUG lead', async () => {
      // Mock contribution exists check
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 3, 
          kug_id: 1, 
          user_id: 2,
          status: 'pending' 
        }] 
      });
      
      // Mock KUG lead check (not a lead)
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app)
        .put('/api/contributions/3/approve')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'member');
      
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'Access denied');
    });
  });
});
